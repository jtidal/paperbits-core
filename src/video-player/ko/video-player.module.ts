import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler, IContentDropHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { VideoPlayerViewModel } from "./videoPlayerViewModel";
import { VideoPlayerModelBinder } from "../videoPlayerModelBinder";
import { VideoEditor } from "./videoEditor";
import { VideoHandlers } from "./videoHandlers";
import { VideoPlayerViewModelBinder } from "./videoPlayerViewModelBinder";

export class VideoPlayerModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {        
        injector.bind("videoPlayer", VideoPlayerViewModel);
        injector.bind("videoPlayerModelBinder", VideoPlayerModelBinder);    
        this.modelBinders.push(injector.resolve("videoPlayerModelBinder"));

        injector.bind("videoPlayerViewModelBinder", VideoPlayerViewModelBinder);
        this.viewModelBinders.push(injector.resolve("videoPlayerViewModelBinder"));
    }
}