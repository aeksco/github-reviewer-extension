import React from "react";
import { Hello } from "@src/components/hello";
import { browser, Tabs } from "webextension-polyfill-ts";
import { Scroller } from "@src/components/scroller";
import css from "./styles.module.css";

// // // //

// Scripts to execute in current tab
const toggleAllScript = `document.querySelectorAll(".btn-octicon.js-details-target").forEach(el => el.click())`;
const viewAllScript = `document.querySelectorAll(".js-reviewed-checkbox").forEach(el => el.click())`;
const viewAllUnviewedScript = `document.querySelectorAll(".js-reviewed-checkbox.js-reviewed-file").forEach(el => el.click())`;

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
            <div className="mx-4 my-4">
                <Hello />
                <hr />
                <Scroller
                    toggleAll={() => {
                        executeScript(toggleAllScript);
                    }}
                    markAllViewed={() => {
                        executeScript(viewAllScript);
                    }}
                    markAllUnviewedViewed={() => {
                        executeScript(viewAllUnviewedScript);
                    }}
                />
            </div>
        </div>
    );
}
