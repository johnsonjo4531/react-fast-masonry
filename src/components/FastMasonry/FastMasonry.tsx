// started from react-masonry-infinite

import React, { useEffect } from "react";
import Bricks from "bricks.js";
import List, {
  IterableType,
  ListProps,
} from "@researchgate/react-intersection-list";
import ListClass from "@researchgate/react-intersection-list";

export type MasonryInfiniteScrollerProps<ItemType> = ListProps & {
  items: ItemType[];
  loadMore: () => void;
  onIntersection?: ListProps["onIntersection"];
  renderItem: Required<ListProps>["renderItem"];
  className?: string;
  pack?: boolean;
  packedAttribute?: string;
  position?: boolean;
  sizes?: { columns: number; gutter: number; mq?: string }[];
  style?: React.CSSProperties;
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
  sizes = [
    { columns: 1, gutter: 20 },
    { mq: "768px", columns: 2, gutter: 20 },
    { mq: "1024px", columns: 3, gutter: 20 },
  ],
  style = {},
  ...props
}: MasonryInfiniteScrollerProps<T>) => {
  const listComponent = React.useRef<ListClass | null>(null);
  const masonryContainer = React.useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = React.useState<Bricks.Instance | null>(null);

  useEffect(() => {
    handleSentinel();
  }, []);

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

    if (items.length !== items.length) {
      if (pack) {
        instance?.pack();
      } else {
        instance?.update();
      }
      return;
    }
  }, [items, instance]);

  function forcePack() {
    if (masonryContainer.current) {
      instance?.pack();
    }
  }

  function forceUpdate() {
    if (masonryContainer.current) {
      instance?.update();
    }
  }

  useEffect(() => {
    if (masonryContainer.current !== null && instance === null) {
      createNewInstance(masonryContainer.current);
    }
    return () => {
      if (instance) {
        instance.resize(false);
      }
    };
  }, [instance]);

  function createNewInstance(container: Node) {
    const instance = Bricks({
      container,
      packed: packedAttribute,
      sizes: sizes,
      position: position,
    });

    instance.resize(true);

    if (items.length > 0) {
      instance.pack();
    }

    setInstance(instance);
    return instance;
  }

  function itemsRenderer(
    items: IterableType,
    ref: (instance: React.ReactInstance) => void
  ) {
    return (
      <div
        ref={(Ref) => {
          if (!Ref) return;
          ref(Ref);
          masonryContainer.current = Ref;
        }}
        className={className}
        style={style}
      >
        {items}
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
