import React, { Component } from "react";
import "../style/Tip.css";
export class Tip extends Component {
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
        return (React.createElement("div", { className: "Tip" },
            compact && (React.createElement("div", { className: "Tip__compact__wrapper" },
                React.createElement("div", { className: "Tip__compact", onClick: () => {
                        var _a, _b;
                        onOpen();
                        (_b = (_a = this.props).onHighLightClick) === null || _b === void 0 ? void 0 : _b.call(_a);
                    } }, "Highlight"),
                React.createElement("div", { className: "Tip__compact", onClick: () => {
                        onOpen();
                        this.setState({ note: true, compact: false });
                    } }, "Add Note"),
                React.createElement("div", { className: "Tip__compact", onClick: () => {
                        var _a, _b;
                        onOpen();
                        (_b = (_a = this.props).onShareQuoteClick) === null || _b === void 0 ? void 0 : _b.call(_a);
                    } }, "Share Quote"))),
            note && (React.createElement("form", { className: "Tip__card", onSubmit: (event) => {
                    event.preventDefault();
                    onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm({ text, emoji });
                } },
                React.createElement("div", null,
                    React.createElement("textarea", { placeholder: "Your comment", autoFocus: true, value: text, onChange: (event) => this.setState({ text: event.target.value }), ref: (node) => {
                            if (node) {
                                node.focus();
                            }
                        } })),
                React.createElement("div", null,
                    React.createElement("input", { type: "submit", value: "Save" }))))));
    }
}
export function HighlightTip({ onShare, handleNote, onDelete }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "Tip" },
            React.createElement("div", { className: "Tip__compact__wrapper" },
                React.createElement("div", { className: "Tip__compact", onClick: onDelete }, "Delete"),
                React.createElement("div", { className: "Tip__compact", onClick: () => {
                        handleNote(true);
                    } }, "Add Note"),
                React.createElement("div", { className: "Tip__compact", onClick: onShare }, "Share Quote")))));
}
export default Tip;
//# sourceMappingURL=Tip.js.map