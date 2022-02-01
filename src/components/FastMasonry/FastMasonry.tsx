// started from react-masonry-infinite

import React, { useEffect } from "react";
import Bricks from "bricks.js";
import List, {
  IterableType,
  ListProps
} from "@researchgate/react-intersection-list";

export type MasonryInfiniteScrollerProps<ItemType> = ListProps & {
  items: ItemType[];
  loadMore: () => void;
  onIntersection?: ListProps["onIntersection"];
  renderItem: Required<ListProps>["renderItem"];
  className?: string;
  outerClassName?: string;
  pack?: boolean;
  packedAttribute?: string;
  position?: boolean;
  /** The sizes for columns and gutters at specific container queries */
  sizes: [
    {
      columns: number;
      gutter: number;
      /** The min-width of the surrounding container to apply the columns and gutters. The number will be zero if left off. */
      cq?: number;
    },
    ...{
      columns: number;
      gutter: number;
      /** The min-width of the surrounding container to apply the columns and gutters. The number will be zero if left off. */
      cq?: number;
    }[]
  ];
  style?: React.CSSProperties;
  outerStyle?: React.CSSProperties;
};
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
    width: "auto !important"
  },
  outerClassName = "",
  ...props
}: MasonryInfiniteScrollerProps<T>) => {
  const containerComponent = React.useRef<HTMLDivElement | null>(null);
  const masonryContainer = React.useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = React.useState<Bricks.Instance | null>(null);
  const [computedSize, setComputedSize] = React.useState<
    NonNullable<MasonryInfiniteScrollerProps<any>["sizes"]>[number]
  >({ columns: 1, gutter: 0 });
  const [currentSize, setCurrentSize] = React.useState<
    NonNullable<MasonryInfiniteScrollerProps<any>["sizes"]>[number]
  >({ columns: 1, gutter: 0 });

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
        console.log("HERE!", foundIdx, sizes[foundIdx - 1]);
        setComputedSize({
          columns: sizes[foundIdx - 1].columns,
          gutter: sizes[foundIdx - 1].gutter
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

  useEffect(() => {
    handleSentinel();
  }, [handleSentinel]);

  function handleSentinel() {
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
  }

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
  }, [items, instance]);

  function forcePack() {
    if (masonryContainer.current) {
      instance?.pack();
    }
  }

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
  }, [instance, computedSize, createNewInstance]);

  function createNewInstance(container: Node) {
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
  }

  function itemsRenderer(
    items: IterableType,
    ref: (instance: React.ReactInstance) => void
  ) {
    console.log(items);
    return (
      <div
        ref={Ref => {
          if (!Ref) return;
          containerComponent.current = Ref;
        }}
        className={outerClassName}
        style={outerStyle}
      >
        <div
          ref={Ref => {
            if (!Ref) return;
            ref(Ref);
            masonryContainer.current = Ref;
          }}
          className={className}
          style={style}
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
      renderItem={renderItem}
      itemsRenderer={itemsRenderer}
      onIntersection={intersection}
      {...props}
    />
  );
};

export default FastMasonry;
