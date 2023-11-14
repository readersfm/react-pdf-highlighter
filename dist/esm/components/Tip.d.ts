import { Component } from "react";
import "../style/Tip.css";
interface State {
    compact: boolean;
    text: string;
    note: boolean;
    emoji: string;
}
interface Props {
    onConfirm?: (comment: {
        text: string;
        emoji: string;
    }) => void;
    onOpen: () => void;
    onUpdate?: () => void;
    onHighLightClick?: () => any;
    onShareQuoteClick?: () => any;
}
export declare class Tip extends Component<Props, State> {
    state: State;
    componentDidUpdate(nextProps: Props, nextState: State): void;
    render(): JSX.Element;
}
export declare function HighlightTip({ onShare, handleNote, onDelete }: any): JSX.Element;
export default Tip;
