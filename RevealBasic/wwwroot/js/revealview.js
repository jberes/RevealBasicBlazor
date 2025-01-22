window.loadRevealView = async function (viewId, dashboardName) {

    // Dynamically pass headers to server
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
        return headers;
    });

    const headers = {};

    let rvDashboard;
    if (dashboardName) {
        // Set a header variable, pass a token, etc.
        headers["x-header-customerId"] = "BLONP";
        headers["x-header-orderId"] = "10248";
        rvDashboard = await $.ig.RVDashboard.loadDashboard(dashboardName);
    }

    const revealView = new $.ig.RevealView("#" + viewId);

    if (!rvDashboard) {
        revealView.startInEditMode = true;
        headers["x-header-customerId"] = "BLONP";
        revealView.onDataSourcesRequested = (callback) => {

            // REST Data Source Example w/ Client Side URL
            const restDataSource = new $.ig.RVRESTDataSource();
            restDataSource.id = "RestDataSource"
            restDataSource.url = "https://excel2json.io/api/share/8bf0acfa-7fd8-468e-0478-08daa4a8d995";
            restDataSource.title = "Auto Users Data - Global";
            restDataSource.subtitle = "from Excel2Json";
            restDataSource.useAnonymousAuthentication = true;

            // SQL Server Data Source Example
            var sqlServerDataSource = new $.ig.RVAzureSqlDataSource();
            sqlServerDataSource.id = "sqlServer";
            sqlServerDataSource.title = "SQL Server Data Source";
            sqlServerDataSource.subtitle = "Full Northwind Database";

            // SQL Server Data Source Item in Stored Procs
            var sqlDataSourceItem1 = new $.ig.RVAzureSqlDataSourceItem(sqlServerDataSource);
            sqlDataSourceItem1.id = "CustomerOrders";
            sqlDataSourceItem1.title = "Customer Orders";
            sqlDataSourceItem1.subtitle = "Custom SQL Query (orderId)";

            var sqlDataSourceItem2 = new $.ig.RVAzureSqlDataSourceItem(sqlServerDataSource);
            sqlDataSourceItem2.id = "CustOrderHist";
            sqlDataSourceItem2.title = "Customer Orders History";
            sqlDataSourceItem2.subtitle = "Stored Procedure (customerId)";

            var sqlDataSourceItem3 = new $.ig.RVAzureSqlDataSourceItem(sqlServerDataSource);
            sqlDataSourceItem3.id = "CustOrdersOrders";
            sqlDataSourceItem3.title = "Customer Orders Orders";
            sqlDataSourceItem3.subtitle = "Stored Procedure  (customerId)";

            var sqlDataSourceItem4 = new $.ig.RVAzureSqlDataSourceItem(sqlServerDataSource);
            sqlDataSourceItem4.id = "TenMostExpensiveProducts";
            sqlDataSourceItem4.title = "Ten Most Expensive Products";
            sqlDataSourceItem4.subtitle = "Stored Procedure";

            callback(new $.ig.RevealDataSources([sqlServerDataSource, restDataSource], [sqlDataSourceItem1,
                sqlDataSourceItem2,
                sqlDataSourceItem3,
                sqlDataSourceItem4], true));
        };
    }
    revealView.dashboard = rvDashboard;
}

window.createRevealTheme = function () {
    // Set a custom theme
    var theme = $.ig.RevealSdkSettings.theme.clone();
    theme.chartColors = ["#09B1A9", "#003B4A", "#93C569", "#FEB51E", "#FF780D", "#CA365B"];
    theme.regularFont = "Inter";
    theme.mediumFont = "Inter";
    theme.boldFont = "Inter";
    theme.useRoundedCorners = false;
    theme.dashboardBackgroundColor = "white";
    return theme;
}