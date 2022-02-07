import React from "react";
import { Hello } from "@src/components/hello";
import { browser, Tabs } from "webextension-polyfill-ts";
import { Scroller } from "@src/components/scroller";
import css from "./styles.module.css";

// // // //

// Scripts to execute in current tab
const toggleAllScript = `document.querySelectorAll(".btn-octicon.js-details-target").forEach(el => el.click())`;
const toggleAllViewed = `document.querySelectorAll(".js-reviewed-checkbox").forEach(el => el.click())`;

// Set "Not Expanded" -> "Expanded"
const setNotExpandedToExpanded = `document.querySelectorAll('button.btn-octicon.js-details-target[aria-label="Toggle diff contents"][aria-expanded="false"]').forEach(el => el.click())`;

// Set "Expanded" -> "Not Expanded"
const setExpandedToNotExpanded = `document.querySelectorAll('button.btn-octicon.js-details-target[aria-label="Toggle diff contents"][aria-expanded="true"]').forEach(el => el.click())`;

// Set "Viewed" -> "Unviewed"
const setViewedToUnviewed = `document.querySelectorAll(".js-reviewed-file input").forEach(el => el.click())`;

// Set "Unviewed" -> "Viewed"
const setUnviewedToViewed = `document.querySelectorAll(".js-reviewed-toggle:not(.js-reviewed-file) input").forEach(el => el.click())`;

// const setViewedToUnviewed = `document.querySelectorAll(".js-reviewed-file.color-fg-muted input").forEach(el => el.click())`; // WORKING
// const setAllViewed = `document.querySelectorAll(".js-reviewed-file.color-fg-muted input").forEach(el => el.click())`; // WORKING

// js-reviewed-toggle .color-fg-muted.color-border-muted

/**
 * Executes a string of Javascript on the current tab
 * @param code The string of code to execute on the current tab
 */
function executeScript(code: string): void {
    // Query for the active tab in the current window
    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs: Tabs.Tab[]) => {
            // Pulls current tab from browser.tabs.query response
            const currentTab: Tabs.Tab | undefined = tabs[0];

            // Short circuits function execution is current tab isn't found
            if (!currentTab) {
                return;
            }

            // Executes the script in the current tab
            browser.tabs
                .executeScript(currentTab.id, {
                    code,
                })
                .then(() => {
                    console.log("Done Scrolling");
                });
        });
}

// // // //

export function Popup() {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return (
        <div className={css.popupContainer}>
            <div className="mx-4 my-4 w-full">
                <Hello />
                <hr />
                <Scroller
                    toggleAll={() => {
                        executeScript(setExpandedToNotExpanded);
                    }}
                    markAllViewed={() => {
                        executeScript(setNotExpandedToExpanded);
                    }}
                    setViewedToUnviewed={() => {
                        executeScript(setViewedToUnviewed);
                    }}
                    setUnviewedToViewed={() => {
                        executeScript(setUnviewedToViewed);
                    }}
                />
            </div>
        </div>
    );
}
