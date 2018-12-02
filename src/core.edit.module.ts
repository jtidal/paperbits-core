import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { VideoPlayerEditorModule } from "./video-player/ko/videoPlayerEditor.module";
import { PictureEditorModule } from "./picture/ko/pictureEditor.module";
import { YoutubePlayerEditorModule } from "./youtube-player/ko/youtubePlayerEditor.module";
import { NavbarEditorModule } from "./navbar/ko/navbarEditor.module";
import { TableOfContentsEditorModule } from "./table-of-contents/ko/tableOfContentsEditor.module";
import { MapEditorModule } from "./map/ko/mapEditor.module";
import { ButtonEditorModule } from "./button/ko/buttonEditor.module";
import { TestimonialsEditorModule } from "./testimonials/ko/testimonialsEditor.module";
import { ColumnEditorModule } from "./column/ko/columnEditor.module";
import { SectionEditorModule } from "./section/ko/sectionEditor.module";
import { RowEditorModule } from "./row/ko/rowEditor.module";
import { BlockWorkshopModule } from "./workshops/block/ko/block.module";
import { BlogWorkshopModule } from "./workshops/blog/ko/blog.module";
import { SliderEditorModule } from "./slider/ko/sliderEditor.module";
import { LayoutWorkshopModule } from "./workshops/layout/ko/layout.module";
import { PageWorkshopModule } from "./workshops/page/ko/page.module";
import { SettingsWorkshop } from "./workshops/settings/ko/settings";
import { MediaWorkshopModule } from "./workshops/media/ko/media.module";
import { NavigationWorkshopModule } from "./workshops/navigation/ko/navigation.module";
import { Workshops } from "./workshops/ko/workshops";
import { TextblockEditorModule } from "./textblock/ko/textblockEditor.module";
import { DropbucketModule } from "./workshops/dropbucket/ko/dropbucket.module";
import { ViewportSelector } from "./workshops/viewports/ko/viewport-selector";
import { HostBindingHandler, BalloonBindingHandler, ResizableBindingHandler } from "./ko/bindingHandlers";
import { IContentDropHandler, IWidgetHandler, MediaHandlers, HtmlEditorProvider } from "@paperbits/common/editing";
import { IHyperlinkProvider, LityLightbox } from "@paperbits/common/ui";
import { HyperlinkSelector } from "./workshops/hyperlinks/ko/hyperlinkSelector";
import { WidgetSelector } from "./workshops/widgets/ko/widgetSelector";
import { UrlSelector } from "./workshops/urls/ko/urlSelector";
import { PageEditorModule } from "./page/ko/pageEditor.module";
import { LayoutEditorModule } from "./layout/ko/layoutEditor.module";
import { PageHyperlinkProvider } from "@paperbits/common/pages";
import { BlogHyperlinkProvider } from "@paperbits/common/blogs/blogHyperlinkProvider";
import { UrlHyperlinkProvider } from "@paperbits/common/urls/urlHyperlinkProvider";
import { MediaHyperlinkProvider } from "@paperbits/common/media";
import { DragManager } from "@paperbits/common/ui/draggables";
import { PlaceholderViewModel } from "./placeholder/ko/placeholderViewModel";
import { SearchResultsEditorModule } from "./search-results/ko/searchResultsEditor.module";
import { PricingTableEditorModule } from "./pricing-table/ko";
import { ViewManager, Tooltip } from "./ko/ui";
import { KnockoutValidation } from "./ko/validation/validators";
import { CropperBindingHandler } from "./workshops/cropper/cropper";
import { GridEditor } from "./grid/ko";


export class CoreEditModule implements IInjectorModule {
    public register(injector: IInjector): void {
        // injector.bindSingleton("settingsProvider", SettingsProvider);
        // injector.bindSingleton("routeHandler", DefaultRouteHandler); 

        injector.bindSingleton("viewManager", ViewManager);
        injector.bind("pageHyperlinkProvider", PageHyperlinkProvider);
        injector.bind("blogHyperlinkProvider", BlogHyperlinkProvider);
        injector.bind("mediaHyperlinkProvider", MediaHyperlinkProvider);
        injector.bind("urlHyperlinkProvider", UrlHyperlinkProvider);
        injector.bind("gridEditor", GridEditor);

        injector.bindSingleton("knockoutValidation", KnockoutValidation);
        injector.bindSingleton("resizableBindingHandler", ResizableBindingHandler);
        injector.bindSingleton("cropperBindingHandler", CropperBindingHandler);
        injector.bindSingleton("balloonBindingHandler", BalloonBindingHandler);
        injector.bind("tooltip", Tooltip);

        injector.bindFactory<IHyperlinkProvider[]>("resourcePickers", (ctx: IInjector) => {
            const pageReourcePicker = ctx.resolve<IHyperlinkProvider>("pageHyperlinkProvider");
            const blogReourcePicker = ctx.resolve<IHyperlinkProvider>("blogHyperlinkProvider");
            const mediaReourcePicker = ctx.resolve<IHyperlinkProvider>("mediaHyperlinkProvider");
            const urlHyperlinkProvider = ctx.resolve<IHyperlinkProvider>("urlHyperlinkProvider");

            return [
                pageReourcePicker,
                blogReourcePicker,
                mediaReourcePicker,
                urlHyperlinkProvider
            ];
        });

        /*** UI ***/
        injector.bindSingleton("dragManager", DragManager);
        injector.bindSingleton("lightbox", LityLightbox);
        injector.bind("placeholderWidget", PlaceholderViewModel);


        /*** Editors ***/
        injector.bindSingleton("htmlEditorProvider", HtmlEditorProvider);
        injector.bindSingletonFactory<IContentDropHandler[]>("dropHandlers", () => {
            return new Array<IContentDropHandler>();
        });
        injector.bindSingletonFactory<IWidgetHandler[]>("widgetHandlers", () => {
            return new Array<IWidgetHandler>();
        });

        injector.bindSingleton("mediaHandler", MediaHandlers);

        injector.bind("workshops", Workshops);
        injector.bind("viewportSelector", ViewportSelector);
        injector.bindSingleton("hostBindingHandler", HostBindingHandler);
        injector.bind("settingsWorkshop", SettingsWorkshop);

        injector.bind("hyperlinkSelector", HyperlinkSelector);
        injector.bind("widgetSelector", WidgetSelector);
        injector.bind("urlSelector",  UrlSelector);

        injector.bindModule(new TextblockEditorModule());
        injector.bindModule(new PictureEditorModule());
        injector.bindModule(new ButtonEditorModule());
        injector.bindModule(new MapEditorModule());
        injector.bindModule(new VideoPlayerEditorModule());
        injector.bindModule(new YoutubePlayerEditorModule());
        injector.bindModule(new TestimonialsEditorModule());
        injector.bindModule(new TableOfContentsEditorModule());
        injector.bindModule(new NavbarEditorModule());
        injector.bindModule(new SearchResultsEditorModule());
        injector.bindModule(new PricingTableEditorModule());

        injector.bindModule(new DropbucketModule());
        injector.bindModule(new LayoutWorkshopModule());
        injector.bindModule(new PageWorkshopModule());
        injector.bindModule(new BlogWorkshopModule());
        injector.bindModule(new BlockWorkshopModule());
        injector.bindModule(new MediaWorkshopModule());
        injector.bindModule(new NavigationWorkshopModule());
        injector.bindModule(new ColumnEditorModule());
        injector.bindModule(new RowEditorModule());
        injector.bindModule(new SectionEditorModule());
        injector.bindModule(new LayoutEditorModule());
        injector.bindModule(new PageEditorModule());
        injector.bindModule(new SliderEditorModule());
    }
}