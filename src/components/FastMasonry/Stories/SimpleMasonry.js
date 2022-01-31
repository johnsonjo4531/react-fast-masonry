"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("intersection-observer");
const react_1 = __importDefault(require("react"));
const index_1 = __importDefault(require("../../../index"));
class MyMasonry extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: [],
        };
        this.randomItems = (n = 20) => {
            return new Array(n).fill(0).map(() => ({
                width: 300,
                height: this.randomInt(100, 1000),
                backgroundColor: MyMasonry.colors[this.randomInt(0, MyMasonry.colors.length - 1)],
            }));
        };
        this.randomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
        };
        this.loadMore = () => {
            this.setState((state) => ({
                items: [...state.items, ...this.randomItems()],
            }));
        };
        // `this` must be bound to the render item function in order to use it.
        this.renderItem = (index, key) => {
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ style: Object.assign(Object.assign({}, this.state.items[index]), MyMasonry.defaultStyles) }, { children: index }), void 0));
        };
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(index_1.default, { items: this.state.items, renderItem: this.renderItem, loadMore: this.loadMore, awaitMore: true, pageSize: 20, className: "masonry" }, void 0));
    }
}
exports.default = MyMasonry;
MyMasonry.defaultStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};
MyMasonry.colors = [
    "cornflowerblue",
    "tomato",
    "steelblue",
    "slategrey",
    "turquoise",
    "teal",
    "darkcyan",
    "darkseagreen",
    "coral",
];
