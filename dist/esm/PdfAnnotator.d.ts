/// <reference types="react" />
import { IHighlight, Comment } from "./types";
type Props = {
    pdfSrc: string;
    onNewHightlight?: (h: IHighlight) => any;
    onShareQuote?: (text: string) => any;
    highlights: Array<IHighlight>;
    onDeleteHighlight?: (id: string) => any;
    onUpdateHighlight?: (id: string, comment: Comment) => any;
    isDualPageArrow?: boolean;
};
export declare function PdfAnnotator({ pdfSrc, highlights, onNewHightlight, onShareQuote, onDeleteHighlight, onUpdateHighlight, isDualPageArrow, }: Props): JSX.Element;
export default PdfAnnotator;
