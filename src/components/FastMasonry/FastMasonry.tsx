// started from react-masonry-infinite

import React, { ReactNode, useEffect } from "react";
import Bricks from "bricks.js";
import List, { ListProps } from "@researchgate/react-intersection-list";

export type MasonryInfiniteScrollerProps<ItemType> = ListProps & {
  items: ItemType[];
  loadMore: () => void;
  onIntersection?: ListProps["onIntersection"];
  renderItem: Required<ListProps>["renderItem"];
  awaitMore?: boolean;
  className?: string;
  pack?: boolean;
  packedAttribute?: string;
  position?: boolean;
  sizes?: { columns: number; gutter: number; mq?: string }[];
  style?: React.CSSProperties;
};
export const MasonryInfiniteScroller = <T extends any>({
  items,
  renderItem,
  loadMore,
  onIntersection,
  awaitMore,
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
  const listComponent = React.useRef<React.ReactInstance | null>(null);
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
    if (masonryContainer.current) {
      const instance = createNewInstance(masonryContainer.current);
      return () => {
        if (instance) {
          instance.resize(false);
        }
      };
    }
  }, [instance, masonryContainer.current]);

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

  function itemsRenderer(items: any) {
    return (
      <div ref={masonryContainer} className={className} style={style}>
        {items}
      </div>
    );
  }

  function intersection(
    ...args: Parameters<NonNullable<ListProps["onIntersection"]>>
  ) {
    onIntersection && onIntersection(...args);
    if (
      listComponent &&
      listComponent.current &&
      (listComponent.current as any).state &&
      (listComponent.current as any).state.size >= items.length
    ) {
      return loadMore();
    } else {
      forcePack();
    }
  }

  return (
    <List
      ref={listComponent as any}
      items={items}
      renderItem={renderItem}
      itemsRenderer={itemsRenderer}
      onIntersection={intersection}
      {...props}
    />
  );
};

export default MasonryInfiniteScroller;
