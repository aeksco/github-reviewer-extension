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
    markAllUnviewedViewed: () => void;
}) {
    return (
        <div className="grid gap-3 grid-cols-2 mt-3 w-full">
            <button
                className={css.btn}
                data-testid="scroll-to-top"
                onClick={() => props.toggleAll()}
            >
                Toggle All Files
            </button>
            <button
                className={css.btn}
                data-testid="mark-all-viewed"
                onClick={() => props.markAllViewed()}
            >
                Toggle All Viewed
            </button>
            <button
                className={css.btn}
                data-testid="mark-all-viewed"
                onClick={() => props.markAllUnviewedViewed()}
            >
                Mark All Unviewed
            </button>
        </div>
    );
}
