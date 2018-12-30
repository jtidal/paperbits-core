﻿import * as ko from "knockout";
import PerfectScrollbar from "perfect-scrollbar";

ko.bindingHandlers["scrollable"] = {
    init: (element: HTMLElement, valueAccessor) => {
        const config = ko.unwrap(valueAccessor());
        let scrollbar = new PerfectScrollbar(element);

        element.addEventListener("ps-y-reach-end", () => {
            if (config.onEndReach) {
                config.onEndReach();
            }
        });

        const checkElementSize = (): void => {
            requestAnimationFrame(() => {
                if (!scrollbar) {
                    return;
                }

                scrollbar.update();
                setTimeout(checkElementSize, 100);
            });
        };

        checkElementSize();

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            scrollbar.destroy();
            scrollbar = null;
        });
    }
};

ko.bindingHandlers["scrolledIntoView"] = {
    init: (element: HTMLElement, valueAccessor) => {
        const config: any = ko.unwrap(valueAccessor());
        let scrollTimeout;

        const checkInView = () => {
            const elementRect = element.getBoundingClientRect();
            const parentElementRect = element.parentElement.getBoundingClientRect();

            if ((elementRect.top >= parentElementRect.top && elementRect.top <= parentElementRect.bottom) ||
                (elementRect.bottom >= parentElementRect.top && elementRect.bottom <= parentElementRect.bottom)) {

                if (config.onInView) {
                    config.onInView();
                }
            }
        };

        const onParentScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkInView, 200);
        };

        element.parentElement.addEventListener("scroll", onParentScroll);

        checkInView();

        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            element.parentElement.removeEventListener("scroll", onParentScroll);
        });
    }
};
