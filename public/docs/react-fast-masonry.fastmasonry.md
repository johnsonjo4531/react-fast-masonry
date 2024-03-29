<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react-fast-masonry](./react-fast-masonry.md) &gt; [FastMasonry](./react-fast-masonry.fastmasonry.md)

## FastMasonry variable

The main Fast Masonry component

<b>Signature:</b>

```typescript
FastMasonry: <T extends unknown>({ items, renderItem, loadMore, onIntersection, className, pack, packedAttribute, position, sizes, style, outerStyle, outerClassName, ...props }: MasonryInfiniteScrollerProps<T>) => JSX.Element
```

## Example


```tsx
  <MasonryLayout
      sizes={[
        { columns: 1, gutter: 0, columnWidth: "100%" },
        { cq: 768, columns: 2, gutter: 20, columnWidth: 300 },
        { cq: 1024, columns: 3, gutter: 20, columnWidth: 400 }
      ]}
      items={this.state.items}
      renderItem={({ columnWidth }, index: number, key: any) => (
        <div
          style={{
            ...this.state.items[index],
            ...MyMasonry.defaultStyles,
            width: columnWidth
          }}
          key={key}
        >
          {index}
        </div>
      )}
      loadMore={this.loadMore}
      awaitMore={true}
      pageSize={20}
      className="masonry"
    />
```

