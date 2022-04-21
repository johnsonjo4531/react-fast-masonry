/**
 * # react-fast-masonry
 *
 * A react masonry library featuring infinite-scrolling capabilities using [bricks.js](http://callmecavs.com/bricks.js/) and [react-intersection list](https://github.com/researchgate/react-intersection-list). It's based off [react-masonry-infinite](https://github.com/skoob13/react-masonry-infinite), but uses react-intersection-list instead of react-infinite-scroll for faster infinite scrolling.
 *
 * Since it's based on bricks.js you will need to set all of your items within the masonry container to be the same width. What makes this different then bricks.js is it allows container-queries on it's sizing options rather than media queries. It also allows you to set custom widths at those container query breakpoints.
 *
 * ## Installing
 *
 * ```sh
 * npm i --save react-fast-masonry
 * ```
 *
 * ## Usage
 *
 * First import the library `react-fast-masonry`
 *
 * ```jsx
 * import MasonryLayout from "react-fast-masonry";
 * ```
 *
 * Then use it like so.
 *
 * ```jsx
 * <MasonryLayout
 *   // This is a required prop this defines how wide your gutters and columns are (required) and optionally provides a way to  define your column-width (columnWidth) and container-queries (cq)
 *   sizes={[
 *     { columns: 1, gutter: 0, columnWidth: "100%" },
 *     { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
 *     { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
 *   ]}
 *   items={this.state.items}
 *   // The columnWidth here comes from the sizes prop up above
 *   renderItem={({ columnWidth }, index: number, key: any) => (
 *     <div
 *       style={{
 *         width: columnWidth
 *       }}
 *       key={key}
 *     >
 *       {index}
 *     </div>
 *   )}
 *   loadMore={this.loadMore}
 *   awaitMore={true}
 *   pageSize={20}
 *   className="masonry"
 * />
 * ```
 *
 * A full fledged example of the above might is given as the Simple masonry layout in the [storybook](https://johnsonjo4531.github.io/react-fast-masonry/?selectedKind=FastMasonry&selectedStory=Simple%20masonry%20layout&full=0&addons=0&stories=1&panelRight=0).
 *
 *
 * @packageDocumentation
 */

import React, { useEffect } from "react";
import Bricks from "bricks.js";
import List, {
  IterableType,
  ListProps
} from "@researchgate/react-intersection-list";

/** Allows the masonry layout to be addjusted at certain container sizes.
 * @public */
export type MasonrySizing = {
  /** The number of columns to display across the container. */
  columns: number;
  /** The sizing of the space between columns
   * @public
   */
  gutter: number;
  /** The column widths (note they must all be the same width since bricks.js is used) */
  columnWidth?: NonNullable<React.CSSProperties["width"]>;
  /** The min-width of the surrounding container to apply these MasonrySizing constraints. The number will be zero if left off. */
  cq?: number;
};
/** The input props to the FastMasonry component
 *
 * @public */
export type MasonryInfiniteScrollerProps<ItemType> = Omit<
  ListProps,
  "renderItem" | "children" | "itemCount"
> & {
  items: ItemType[];
  loadMore: () => void;
  onIntersection?: ListProps["onIntersection"];
  renderItem: (
    currentSizing: MasonrySizing,
    ...args: Parameters<Required<ListProps>["renderItem"]>
  ) => ReturnType<Required<ListProps>["renderItem"]>;
  className?: string;
  outerClassName?: string;
  pack?: boolean;
  packedAttribute?: string;
  position?: boolean;
  /** The sizes for columns and gutters at specific container queries */
  sizes: [MasonrySizing, ...MasonrySizing[]];
  style?: React.CSSProperties;
  outerStyle?: React.CSSProperties;
};
/** The main Fast Masonry component
 *
 * @example
 * ```tsx
 *   <MasonryLayout
 *       sizes={[
 *         { columns: 1, gutter: 0, columnWidth: "100%" },
 *         { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
 *         { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
 *       ]}
 *       items={this.state.items}
 *       renderItem={({ columnWidth }, index: number, key: any) => (
 *         <div
 *           style={{
 *             ...this.state.items[index],
 *             ...MyMasonry.defaultStyles,
 *             width: columnWidth
 *           }}
 *           key={key}
 *         >
 *           {index}
 *         </div>
 *       )}
 *       loadMore={this.loadMore}
 *       awaitMore={true}
 *       pageSize={20}
 *       className="masonry"
 *     />
 * ```
 *
 * @param props - The functions props
 *
 * @public
 */
export const FastMasonry = <T extends any>({
  items,
  renderItem,
  loadMore,
  onIntersection,
  className = "",
  pack = false,
  packedAttribute = "data-packed",
  position = true,
  sizes,
  style = {
    margin: "0 auto"
  },
  outerStyle = {
    width: "100%"
  },
  outerClassName = "",
  ...props
}: MasonryInfiniteScrollerProps<T>) => {
  const containerComponent = React.useRef<HTMLDivElement | null>(null);
  const masonryContainer = React.useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = React.useState<Bricks.Instance | null>(null);
  const [computedSize, setComputedSize] = React.useState<
    NonNullable<MasonryInfiniteScrollerProps<any>["sizes"]>[number]
  >({ columns: 1, gutter: 0, columnWidth: 300 });
  const [currentSize, setCurrentSize] = React.useState<
    NonNullable<MasonryInfiniteScrollerProps<any>["sizes"]>[number]
  >({ columns: 1, gutter: 0, columnWidth: 300 });

  React.useLayoutEffect(() => {
    if (!containerComponent.current || !sizes) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (!entry.contentRect.width) continue;
        let foundIdx = sizes.findIndex(
          (size, i) => entry.contentRect.width < (size.cq ?? 0)
        );
        if (foundIdx === -1) {
          foundIdx = sizes.length;
        }
        setComputedSize({
          columns: sizes[foundIdx - 1].columns,
          gutter: sizes[foundIdx - 1].gutter,
          columnWidth: sizes[foundIdx - 1].columnWidth
        });
        return;
      }
    });
    resizeObserver.observe(containerComponent.current);

    return () => {
      if (!containerComponent.current) return;
      return resizeObserver.unobserve(containerComponent.current);
    };
  }, [sizes]);

  const handleSentinel = React.useCallback(() => {
    if (
      masonryContainer.current &&
      masonryContainer.current.lastChild &&
      masonryContainer.current.lastChild instanceof HTMLElement &&
      masonryContainer.current.firstChild &&
      masonryContainer.current.firstChild instanceof HTMLElement
    ) {
      // bricks.js sizes the container based off the last elements width
      masonryContainer.current.lastChild.style.width =
        masonryContainer.current.firstChild.style.width;
      // we must unpack the sentinel or it will not be repositioned.
      masonryContainer.current.lastChild.removeAttribute(packedAttribute);
    }
  }, [packedAttribute, masonryContainer]);

  useEffect(() => {
    handleSentinel();
  }, [handleSentinel]);

  useEffect(() => {
    handleSentinel();

    if (items.length === 0 && items.length === 0) {
      return;
    }

    if (items.length === 0 && items.length > 0) {
      instance?.pack();
      return;
    }

    if (pack) {
      instance?.pack();
    } else {
      instance?.update();
    }
  }, [items, instance, handleSentinel, pack]);

  function forcePack() {
    if (masonryContainer.current) {
      instance?.pack();
    }
  }

  const createNewInstance = React.useCallback(
    (container: Node) => {
      const instance = Bricks({
        container,
        packed: packedAttribute,
        sizes: [computedSize],
        position
      });
      setCurrentSize(computedSize);

      instance.pack();

      setInstance(instance);
      return instance;
    },
    [computedSize, packedAttribute, position]
  );

  useEffect(() => {
    if (
      masonryContainer.current !== null &&
      (instance === null ||
        computedSize.cq !== currentSize.cq ||
        computedSize.columns !== currentSize.columns ||
        computedSize.gutter !== currentSize.gutter)
    ) {
      createNewInstance(masonryContainer.current);
    }
    return () => {
      if (instance) {
        instance.resize(false);
      }
    };
  }, [
    instance,
    createNewInstance,
    computedSize.cq,
    computedSize.columns,
    computedSize.gutter,
    currentSize.cq,
    currentSize.columns,
    currentSize.gutter
  ]);

  function itemsRenderer(
    items: IterableType,
    ref: (instance: React.ReactInstance) => void
  ) {
    return (
      <div
        ref={Ref => {
          if (!Ref) return;
          containerComponent.current = Ref;
        }}
        className={outerClassName}
        style={{ ...outerStyle }}
      >
        <div
          ref={Ref => {
            if (!Ref) return;
            ref(Ref);
            masonryContainer.current = Ref;
          }}
          className={className}
          style={{ maxWidth: "100%", margin: "0 auto", ...style }}
        >
          {items}
        </div>
      </div>
    );
  }

  async function intersection(
    ...args: Parameters<NonNullable<ListProps["onIntersection"]>>
  ) {
    onIntersection && onIntersection(...args);
    if (
      masonryContainer &&
      masonryContainer.current &&
      masonryContainer.current.childNodes &&
      masonryContainer.current.childNodes.length >= items.length
    ) {
      await loadMore();
    }
    forcePack();
  }

  return (
    <List
      items={items}
      renderItem={(...args) => renderItem(computedSize, ...args)}
      itemsRenderer={itemsRenderer}
      onIntersection={intersection}
      {...props}
    />
  );
};

export default FastMasonry;
