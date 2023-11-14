import React, { Component } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  text: string;
  note: boolean;
  emoji: string;
}

interface Props {
  onConfirm?: (comment: { text: string; emoji: string }) => void;
  onOpen: () => void;
  onUpdate?: () => void;
  onHighLightClick?: () => any;
  onShareQuoteClick?: (s: string) => any;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
    text: "",
    note: false,
    emoji: "📝",
  };

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, note, emoji } = this.state;

    return (
      <div className="Tip">
        {compact && (
          <div className="Tip__compact__wrapper">
            <div
              className="Tip__compact"
              onClick={() => {
                onOpen();
                this.props.onHighLightClick?.();
              }}
            >
              Highlight
            </div>
            <div
              className="Tip__compact"
              onClick={() => {
                onOpen();
                this.setState({ note: true, compact: false });
              }}
            >
              Add Note
            </div>
            <div
              className="Tip__compact"
              onClick={() => {
                onOpen();
                this.props.onShareQuoteClick?.(this.state.text);
              }}
            >
              Share Quote
            </div>
          </div>
        )}
        {note && (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm?.({ text, emoji });
            }}
          >
            <div>
              <textarea
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
                ref={(node) => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
            </div>
            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export function HighlightTip({ onShare, handleNote, onDelete }: any) {
  return (
    <>
      <div className="Tip">
        <div className="Tip__compact__wrapper">
          <div className="Tip__compact" onClick={onDelete}>
            Delete
          </div>
          <div
            className="Tip__compact"
            onClick={() => {
              handleNote(true);
            }}
          >
            Add Note
          </div>
          <div className="Tip__compact" onClick={onShare}>
            Share Quote
          </div>
        </div>
      </div>
    </>
  );
}

export default Tip;
