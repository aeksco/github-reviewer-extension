import React from "react";
import css from "./styles.module.css";

// // // //

// Have options to toggle all, turn all on, turn all off
// Have hotkeys as opt-in feature!
// Support "mark all viewed" / "mark all unviewed" too!

/**
 * Component that renders buttons to scroll to the top and bottom of the page
 */
export function Scroller(props: {
    toggleAll: () => void;
    markAllViewed: () => void;
    setViewedToUnviewed: () => void;
    setUnviewedToViewed: () => void;
}) {
    return (
        <div className="grid gap-3 grid-cols-1 mt-3 w-full">
            <button
                className={css.btn}
                data-testid="scroll-to-top"
                onClick={() => props.toggleAll()}
            >
                Collapse All
            </button>
            <button
                className={css.btn}
                data-testid="mark-all-viewed"
                onClick={() => props.markAllViewed()}
            >
                Expand All
            </button>
            <button
                className={css.btn}
                data-testid="mark-all-viewed"
                onClick={() => props.setViewedToUnviewed()}
            >
                Set "Viewed" to "Unviewed"
            </button>
            <button
                className={css.btn}
                data-testid="mark-all-unviewed"
                onClick={() => props.setUnviewedToViewed()}
            >
                Set "Unviewed" to "Viewed"
            </button>
        </div>
    );
}
