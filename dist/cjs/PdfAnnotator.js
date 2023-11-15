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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfAnnotator = void 0;
const react_1 = __importDefault(require("react"));
const PdfLoader_1 = __importDefault(require("./components/PdfLoader"));
const Spinner_1 = require("./components/Spinner");
const PdfHighlighter_1 = require("./components/PdfHighlighter");
const Tip_1 = __importStar(require("./components/Tip"));
const Highlight_1 = __importDefault(require("./components/Highlight"));
const AreaHighlight_1 = __importDefault(require("./components/AreaHighlight"));
const Popup_1 = __importDefault(require("./components/Popup"));
const getNextId = () => String(Math.random()).slice(2);
function PdfAnnotator({ pdfSrc, highlights = [], onNewHightlight, onShareQuote, onDeleteHighlight, onUpdateHighlight, isDualPageArrow, pdfScaleValue, }) {
    const handleNextPage = () => {
        var _a, _b, _c;
        let win = window;
        let node = (_a = win.PdfViewer.viewer.getPageView(0)) === null || _a === void 0 ? void 0 : _a.div;
        let container = (_c = (_b = win.PdfViewer) === null || _b === void 0 ? void 0 : _b.viewer) === null || _c === void 0 ? void 0 : _c.container;
        console.log(container, node);
        if ((container === null || container === void 0 ? void 0 : container.scrollLeft) && node) {
            const pageBoundingClientRect = node.getBoundingClientRect();
            let left = container.scrollLeft;
            container.scrollLeft = left + pageBoundingClientRect.width;
        }
    };
    const handlePrevPage = () => {
        var _a, _b, _c;
        let win = window;
        let node = (_a = win.PdfViewer.viewer.getPageView(0)) === null || _a === void 0 ? void 0 : _a.div;
        let container = (_c = (_b = win.PdfViewer) === null || _b === void 0 ? void 0 : _b.viewer) === null || _c === void 0 ? void 0 : _c.container;
        console.log(container, node);
        if ((container === null || container === void 0 ? void 0 : container.scrollLeft) && node) {
            const pageBoundingClientRect = node.getBoundingClientRect();
            let left = container.scrollLeft;
            let res = left - pageBoundingClientRect.width;
            container.scrollLeft = Math.max(typeof res != "number" ? 0 : res, 5);
        }
    };
    return (react_1.default.createElement("div", { style: { height: "100%", width: "100%", position: "relative" } },
        react_1.default.createElement(PdfLoader_1.default, { url: pdfSrc, beforeLoad: react_1.default.createElement(Spinner_1.Spinner, null) }, (pdfDocument) => (react_1.default.createElement(PdfHighlighter_1.PdfHighlighter, { pdfDocument: pdfDocument, enableAreaSelection: (event) => event.altKey, onScrollChange: () => {
                document.location.hash = "";
            }, 
            // pdfScaleValue="page-width"
            scrollRef: (scrollTo) => {
                // this.scrollViewerTo = scrollTo;
                // this.scrollToHighlightFromHash();
            }, onSelectionFinished: (position, content, hideTipAndSelection, transformSelection) => {
                return (react_1.default.createElement(Tip_1.default, { onOpen: transformSelection, onHighLightClick: () => {
                        onNewHightlight === null || onNewHightlight === void 0 ? void 0 : onNewHightlight({
                            id: getNextId(),
                            content,
                            position,
                            comment: { text: "", emoji: "" },
                        });
                        hideTipAndSelection();
                    }, onConfirm: (comment) => {
                        onNewHightlight === null || onNewHightlight === void 0 ? void 0 : onNewHightlight({
                            content,
                            position,
                            comment,
                            id: getNextId(),
                        });
                        hideTipAndSelection();
                    }, onShareQuoteClick: () => {
                        onShareQuote === null || onShareQuote === void 0 ? void 0 : onShareQuote(content.text || "");
                        hideTipAndSelection();
                    } }));
            }, highlightTransform: (highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => (react_1.default.createElement(HighlightTransform, { highlight: highlight, index: index, setTip: setTip, hideTip: hideTip, viewportToScaled: viewportToScaled, screenshot: screenshot, isScrolledTo: isScrolledTo, onDeleteHighlight: onDeleteHighlight, onUpdateHighlight: onUpdateHighlight, onShareQuote: onShareQuote })), highlights: highlights, pdfScaleValue: String(pdfScaleValue) }))),
        isDualPageArrow && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: { right: 10 }, onClick: handleNextPage, className: "dual_page_arrow" },
                react_1.default.createElement("svg", { width: "50", height: "50", viewBox: "0 0 125 125", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M90.9423 56.4943L44.0653 17.4301C42.4718 16.1119 40.4208 15.479 38.3615 15.6698C36.3022 15.8607 34.4025 16.8598 33.0783 18.4484C31.7541 20.037 31.1135 22.0856 31.2965 24.1456C31.4796 26.2056 32.4716 28.1091 34.0552 29.4392L73.7297 62.4991L34.0552 95.559C32.4655 96.8873 31.4681 98.7923 31.282 100.856C31.0959 102.919 31.7364 104.971 33.0628 106.563C34.3892 108.154 36.293 109.154 38.356 109.342C40.419 109.531 42.4725 108.893 44.0653 107.568L90.9423 68.5034C91.8213 67.769 92.5283 66.8507 93.0135 65.8131C93.4986 64.7756 93.7501 63.6442 93.7501 62.4988C93.7501 61.3535 93.4986 60.2221 93.0135 59.1845C92.5283 58.147 91.8213 57.2286 90.9423 56.4943Z", fill: "#333" }))),
            react_1.default.createElement("div", { style: { left: 10 }, onClick: handlePrevPage, className: "dual_page_arrow" },
                react_1.default.createElement("svg", { width: "50", height: "50", viewBox: "0 0 125 125", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { rotate: "180deg" } },
                    react_1.default.createElement("path", { d: "M90.9423 56.4943L44.0653 17.4301C42.4718 16.1119 40.4208 15.479 38.3615 15.6698C36.3022 15.8607 34.4025 16.8598 33.0783 18.4484C31.7541 20.037 31.1135 22.0856 31.2965 24.1456C31.4796 26.2056 32.4716 28.1091 34.0552 29.4392L73.7297 62.4991L34.0552 95.559C32.4655 96.8873 31.4681 98.7923 31.282 100.856C31.0959 102.919 31.7364 104.971 33.0628 106.563C34.3892 108.154 36.293 109.154 38.356 109.342C40.419 109.531 42.4725 108.893 44.0653 107.568L90.9423 68.5034C91.8213 67.769 92.5283 66.8507 93.0135 65.8131C93.4986 64.7756 93.7501 63.6442 93.7501 62.4988C93.7501 61.3535 93.4986 60.2221 93.0135 59.1845C92.5283 58.147 91.8213 57.2286 90.9423 56.4943Z", fill: "#333" })))))));
}
exports.PdfAnnotator = PdfAnnotator;
class HighlightTransform extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            note: false,
        };
    }
    render() {
        var _a;
        const { highlight, index, setTip, hideTip, isScrolledTo, onDeleteHighlight, onUpdateHighlight, onShareQuote, } = this.props;
        const isTextHighlight = !Boolean(highlight.content && highlight.content.image);
        const component = isTextHighlight ? (react_1.default.createElement(Highlight_1.default, { isScrolledTo: isScrolledTo, position: highlight.position, comment: highlight.comment })) : (react_1.default.createElement(AreaHighlight_1.default, { isScrolledTo: isScrolledTo, highlight: highlight, onChange: (boundingRect) => {
                // this.updateHighlight(
                //   highlight.id,
                //   { boundingRect: viewportToScaled(boundingRect) },
                //   { image: screenshot(boundingRect) }
                // );
            } }));
        const { note } = this.state;
        const setNote = (d) => {
            this.setState({ note: d });
        };
        return (react_1.default.createElement(Popup_1.default, { popupContent: ((_a = highlight === null || highlight === void 0 ? void 0 : highlight.comment) === null || _a === void 0 ? void 0 : _a.text) ? (react_1.default.createElement(HighlightPopup, { comment: highlight === null || highlight === void 0 ? void 0 : highlight.comment, onDeleteClick: () => {
                    onDeleteHighlight === null || onDeleteHighlight === void 0 ? void 0 : onDeleteHighlight(highlight.id);
                    hideTip();
                }, onEditClick: () => {
                    // hideTip();
                    setNote(true);
                    setTip(highlight, (highlight) => (react_1.default.createElement(NotePopup, { onEnd: () => setNote(false), comment: highlight.comment, onUpdateData: (newComment) => {
                            console.log("Test onUpdate 2");
                            hideTip();
                            setNote(false);
                            onUpdateHighlight === null || onUpdateHighlight === void 0 ? void 0 : onUpdateHighlight(highlight.id, newComment);
                        } })));
                } })) : (react_1.default.createElement(Tip_1.HighlightTip, { onDelete: () => {
                    onDeleteHighlight === null || onDeleteHighlight === void 0 ? void 0 : onDeleteHighlight(highlight.id);
                    hideTip();
                }, handleNote: () => {
                    hideTip();
                    setNote(true);
                    setTip(highlight, (highlight) => (react_1.default.createElement(NotePopup, { onEnd: () => setNote(false), comment: highlight.comment, onUpdateData: (newComment) => {
                            console.log("Test onUpdate");
                            hideTip();
                            setNote(false);
                            onUpdateHighlight === null || onUpdateHighlight === void 0 ? void 0 : onUpdateHighlight(highlight.id, newComment);
                        } })));
                }, onShare: () => {
                    var _a;
                    onShareQuote === null || onShareQuote === void 0 ? void 0 : onShareQuote(((_a = highlight === null || highlight === void 0 ? void 0 : highlight.content) === null || _a === void 0 ? void 0 : _a.text) || "");
                    hideTip();
                } })), onMouseOver: (popupContent) => !note && setTip(highlight, (highlight) => popupContent), onMouseOut: !note ? hideTip : () => { }, key: index, children: component }));
    }
}
class NotePopup extends react_1.default.Component {
    constructor() {
        var _a, _b;
        super(...arguments);
        this.state = {
            text: ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.comment) === null || _b === void 0 ? void 0 : _b.text) || "",
        };
    }
    componentWillUnmount() {
        this.props.onEnd();
    }
    render() {
        let { onUpdateData } = this.props;
        return (react_1.default.createElement("div", { className: "Tip" },
            react_1.default.createElement("div", { className: "Tip__card" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("textarea", { value: this.state.text, onChange: (e) => {
                            this.setState({ text: e.target.value });
                        }, placeholder: "Your comment", autoFocus: true })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { type: "button", onClick: () => {
                            onUpdateData({ emoji: "📝", text: this.state.text });
                        } }, "Update")))));
    }
}
const HighlightPopup = ({ comment, onDeleteClick, onEditClick }) => comment.text ? (react_1.default.createElement("div", { className: "Highlight__popup" },
    react_1.default.createElement("div", null, comment.text),
    " ",
    react_1.default.createElement("div", { className: "Highlight__popup__dialog__wrapper" },
        react_1.default.createElement("div", { className: "Highlight__popup__dialog" },
            react_1.default.createElement("div", { onClick: () => onDeleteClick() },
                react_1.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("g", { "clip-path": "url(#clip0_2009_18)" },
                        react_1.default.createElement("path", { d: "M15.6364 23.8181H8.36369C7.15816 23.8181 6.00201 23.3392 5.14957 22.4868C4.29713 21.6344 3.81824 20.4782 3.81824 19.2727V8.36362C3.81824 8.12251 3.91402 7.89128 4.0845 7.7208C4.25499 7.55031 4.48622 7.45453 4.72733 7.45453C4.96843 7.45453 5.19966 7.55031 5.37015 7.7208C5.54064 7.89128 5.63642 8.12251 5.63642 8.36362V19.2727C5.63642 19.996 5.92375 20.6897 6.43521 21.2012C6.94668 21.7126 7.64037 22 8.36369 22H15.6364C16.3597 22 17.0534 21.7126 17.5649 21.2012C18.0763 20.6897 18.3637 19.996 18.3637 19.2727V8.36362C18.3637 8.12251 18.4594 7.89128 18.6299 7.7208C18.8004 7.55031 19.0317 7.45453 19.2728 7.45453C19.5139 7.45453 19.7451 7.55031 19.9156 7.7208C20.0861 7.89128 20.1819 8.12251 20.1819 8.36362V19.2727C20.1819 20.4782 19.703 21.6344 18.8505 22.4868C17.9981 23.3392 16.8419 23.8181 15.6364 23.8181Z", fill: "#fff" }),
                        react_1.default.createElement("path", { d: "M21.0909 5.63636H2.90912C2.66801 5.63636 2.43678 5.54058 2.2663 5.37009C2.09581 5.1996 2.00003 4.96837 2.00003 4.72727C2.00003 4.48616 2.09581 4.25493 2.2663 4.08444C2.43678 3.91396 2.66801 3.81818 2.90912 3.81818H21.0909C21.332 3.81818 21.5632 3.91396 21.7337 4.08444C21.9042 4.25493 22 4.48616 22 4.72727C22 4.96837 21.9042 5.1996 21.7337 5.37009C21.5632 5.54058 21.332 5.63636 21.0909 5.63636Z", fill: "#fff" }),
                        react_1.default.createElement("path", { d: "M15.6364 5.63636H8.36368C8.12257 5.63636 7.89134 5.54058 7.72086 5.37009C7.55037 5.19961 7.45459 4.96838 7.45459 4.72727V2.90909C7.45459 2.18578 7.74193 1.49208 8.25339 0.980622C8.76485 0.46916 9.45854 0.181824 10.1819 0.181824H13.8182C14.5415 0.181824 15.2352 0.46916 15.7467 0.980622C16.2581 1.49208 16.5455 2.18578 16.5455 2.90909V4.72727C16.5455 4.96838 16.4497 5.19961 16.2792 5.37009C16.1087 5.54058 15.8775 5.63636 15.6364 5.63636ZM9.27277 3.81818H14.7273V2.90909C14.7273 2.66799 14.6315 2.43676 14.461 2.26627C14.2906 2.09578 14.0593 2 13.8182 2H10.1819C9.94075 2 9.70952 2.09578 9.53904 2.26627C9.36855 2.43676 9.27277 2.66799 9.27277 2.90909V3.81818Z", fill: "#fff" }),
                        react_1.default.createElement("path", { d: "M10.1818 18.3636C9.94072 18.3636 9.70949 18.2678 9.539 18.0973C9.36851 17.9268 9.27274 17.6956 9.27274 17.4545V11.0909C9.27274 10.8498 9.36851 10.6185 9.539 10.4481C9.70949 10.2776 9.94072 10.1818 10.1818 10.1818C10.4229 10.1818 10.6542 10.2776 10.8246 10.4481C10.9951 10.6185 11.0909 10.8498 11.0909 11.0909V17.4545C11.0909 17.6956 10.9951 17.9268 10.8246 18.0973C10.6542 18.2678 10.4229 18.3636 10.1818 18.3636Z", fill: "#fff" }),
                        react_1.default.createElement("path", { d: "M13.8182 18.3636C13.5771 18.3636 13.3458 18.2678 13.1754 18.0973C13.0049 17.9268 12.9091 17.6956 12.9091 17.4545V11.0909C12.9091 10.8498 13.0049 10.6185 13.1754 10.4481C13.3458 10.2776 13.5771 10.1818 13.8182 10.1818C14.0593 10.1818 14.2905 10.2776 14.461 10.4481C14.6315 10.6185 14.7273 10.8498 14.7273 11.0909V17.4545C14.7273 17.6956 14.6315 17.9268 14.461 18.0973C14.2905 18.2678 14.0593 18.3636 13.8182 18.3636Z", fill: "#fff" })),
                    react_1.default.createElement("defs", null,
                        react_1.default.createElement("clipPath", { id: "clip0_2009_18" },
                            react_1.default.createElement("rect", { width: "24", height: "24", fill: "white" }))))),
            react_1.default.createElement("div", { className: "", onClick: () => onEditClick() },
                react_1.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("path", { d: "M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13", stroke: "#fff", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
                    react_1.default.createElement("path", { d: "M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z", stroke: "#fff", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }))))))) : null;
exports.default = PdfAnnotator;
//# sourceMappingURL=PdfAnnotator.js.map