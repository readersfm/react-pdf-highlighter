"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightTip = exports.Tip = void 0;
const react_1 = __importStar(require("react"));
require("../style/Tip.css");
class Tip extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            compact: true,
            text: "",
            note: false,
            emoji: "📝",
        };
    }
    // for TipContainer
    componentDidUpdate(nextProps, nextState) {
        const { onUpdate } = this.props;
        if (onUpdate && this.state.compact !== nextState.compact) {
            onUpdate();
        }
    }
    render() {
        const { onConfirm, onOpen } = this.props;
        const { compact, text, note, emoji } = this.state;
        return (react_1.default.createElement("div", { className: "Tip" },
            compact && (react_1.default.createElement("div", { className: "Tip__compact__wrapper" },
                react_1.default.createElement("div", { className: "Tip__compact", onClick: () => {
                        var _a, _b;
                        onOpen();
                        (_b = (_a = this.props).onHighLightClick) === null || _b === void 0 ? void 0 : _b.call(_a);
                    } }, "Highlight"),
                react_1.default.createElement("div", { className: "Tip__compact", onClick: () => {
                        onOpen();
                        this.setState({ note: true, compact: false });
                    } }, "Add Note"),
                react_1.default.createElement("div", { className: "Tip__compact", onClick: () => {
                        var _a, _b;
                        onOpen();
                        (_b = (_a = this.props).onShareQuoteClick) === null || _b === void 0 ? void 0 : _b.call(_a);
                    } }, "Share Quote"))),
            note && (react_1.default.createElement("form", { className: "Tip__card", onSubmit: (event) => {
                    event.preventDefault();
                    onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm({ text, emoji });
                } },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("textarea", { placeholder: "Your comment", autoFocus: true, value: text, onChange: (event) => this.setState({ text: event.target.value }), ref: (node) => {
                            if (node) {
                                node.focus();
                            }
                        } })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("input", { type: "submit", value: "Save" }))))));
    }
}
exports.Tip = Tip;
function HighlightTip({ onShare, handleNote, onDelete }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "Tip" },
            react_1.default.createElement("div", { className: "Tip__compact__wrapper" },
                react_1.default.createElement("div", { className: "Tip__compact", onClick: onDelete }, "Delete"),
                react_1.default.createElement("div", { className: "Tip__compact", onClick: () => {
                        handleNote(true);
                    } }, "Add Note"),
                react_1.default.createElement("div", { className: "Tip__compact", onClick: onShare }, "Share Quote")))));
}
exports.HighlightTip = HighlightTip;
exports.default = Tip;
//# sourceMappingURL=Tip.js.map