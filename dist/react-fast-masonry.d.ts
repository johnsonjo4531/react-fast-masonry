import { ListProps } from '@researchgate/react-intersection-list';
import { default as React_2 } from 'react';

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
declare const FastMasonry: <T extends unknown>({ items, renderItem, loadMore, onIntersection, className, pack, packedAttribute, position, sizes, style, outerStyle, outerClassName, ...props }: MasonryInfiniteScrollerProps<T>) => JSX.Element;
export { FastMasonry }
export default FastMasonry;

/** The input props to the FastMasonry component
 *
 * @public */
export declare type MasonryInfiniteScrollerProps<ItemType> = Omit<ListProps, "renderItem" | "children" | "itemCount"> & {
    items: ItemType[];
    loadMore: () => void;
    onIntersection?: ListProps["onIntersection"];
    renderItem: (currentSizing: MasonrySizing, ...args: Parameters<Required<ListProps>["renderItem"]>) => ReturnType<Required<ListProps>["renderItem"]>;
    className?: string;
    outerClassName?: string;
    pack?: boolean;
    packedAttribute?: string;
    position?: boolean;
    /** The sizes for columns and gutters at specific container queries */
    sizes: [MasonrySizing, ...MasonrySizing[]];
    style?: React_2.CSSProperties;
    outerStyle?: React_2.CSSProperties;
};

/** Allows the masonry layout to be addjusted at certain container sizes.
 * @public */
export declare type MasonrySizing = {
    /** The number of columns to display across the container. */
    columns: number;
    /** The sizing of the space between columns
     * @public
     */
    gutter: number;
    /** The column widths (note they must all be the same width since bricks.js is used) */
    columnWidth?: NonNullable<React_2.CSSProperties["width"]>;
    /** The min-width of the surrounding container to apply these MasonrySizing constraints. The number will be zero if left off. */
    cq?: number;
};

export { }
