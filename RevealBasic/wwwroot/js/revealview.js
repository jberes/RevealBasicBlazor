//$.ig.RevealSdkSettings.setBaseUrl("https://acmeanalyticsserver.azurewebsites.net/");
window.loadRevealView = function (viewId, dashboardName) {
    $.ig.RVDashboard.loadDashboard(dashboardName).then(dashboard => {
        var revealView = new $.ig.RevealView("#" + viewId);
        revealView.dashboard = dashboard;
    });
}

window.loadRevealView2 = async function (viewId, dashboardName) {
    //$.ig.RevealSdkSettings.setBaseUrl("https://acmeanalyticsserver.azurewebsites.net/");


    //$.ig.RevealSdkSettings.theme = createRevealTheme1();


    let rvDashboard;
    if (dashboardName) {
        rvDashboard = await $.ig.RVDashboard.loadDashboard(dashboardName);
    }

    const revealView = createRevealView(viewId, dashboardName === "Telecomm");
    //console.log("dashboardName");

    if (!rvDashboard) {
        revealView.startInEditMode = true;

        revealView.onDataSourcesRequested = (callback) => {
            const restDataSource = new $.ig.RVRESTDataSource();
            restDataSource.id = "RestDataSource"
            restDataSource.url = "https://excel2json.io/api/share/8bf0acfa-7fd8-468e-0478-08daa4a8d995";
            restDataSource.title = "Auto Users Data - Global";
            restDataSource.subtitle = "from Excel2Json";
            restDataSource.useAnonymousAuthentication = true;
            callback(new $.ig.RevealDataSources([restDataSource], [], true));
        };
    }
    revealView.dashboard = rvDashboard;
}

window.createRevealView = function (viewId, singleVisualizationMode) {
   // $.ig.RevealSdkSettings.theme = createRevealTheme1();

    const revealView = new $.ig.RevealView("#" + viewId);

    //revealView.assets.dashboardEmptyState = new $.ig.RVImageAsset(
    //    new $.ig.RVImage("https://users.infragistics.com/Reveal/Images/editor/add_new_chart70.png", "Empty Dashboard State Image"),
    //    "Let's Visualize Your Beautiful Data",
    //    "Click the + Visualization button to get started");

    if (singleVisualizationMode) {
        revealView.singleVisualizationMode = true;
        revealView.showHeader = false;
        revealView.showMenu = false;
    }

    return revealView;
}

window.createRevealTheme = function (viewId, singleVisualizationMode) {
    var theme = $.ig.RevealSdkSettings.theme.clone();
    theme.chartColors = ["#09B1A9", "#003B4A", "#93C569", "#FEB51E", "#FF780D", "#CA365B"];
    theme.regularFont = "Inter";
    theme.mediumFont = "Inter";
    theme.boldFont = "Inter";
    theme.useRoundedCorners = false;

    if (singleVisualizationMode) {
        theme.dashboardBackgroundColor = "white";
    }
    if (viewId === "revealViewNew") {
        theme.dashboardBackgroundColor = "white";
    }
    else {
        theme.dashboardBackgroundColor = "#F5F5F5";
    }
    return theme;
}

//window.createRevealTheme1 {
//    var theme = $.ig.RevealSdkSettings.theme.clone();
//    theme.chartColors = ["#09B1A9", "#003B4A", "#93C569", "#FEB51E", "#FF780D", "#CA365B"];
//    theme.regularFont = "Montserrat";
//    theme.mediumFont = "Montserrat";
//    theme.boldFont = "Montserrat";
//    theme.useRoundedCorners = false;

//    //if (singleVisualizationMode) {
//    //    theme.dashboardBackgroundColor = "white";
//    //}
//    //if (viewId === "revealViewNew") {
//    //    theme.dashboardBackgroundColor = "white";
//    //}
//    //else {
//        theme.dashboardBackgroundColor = "#F5F5F5";
//    //}
//    return theme;
//}

window.createDashboardThumbnail = function (id, info) {
    let thumbnailView = new $.ig.RevealDashboardThumbnailView("#" + id);
    thumbnailView.dashboardInfo = info;
}
function downloadFile(url, filename) {
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}