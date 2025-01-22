using RevealBasic.Models.AcmeAnalytics;

namespace RevealBasic.AcmeAnalytics
{
    public interface IAcmeAnalyticsService
    {
        Task<List<DashboardNames>> GetDashboardNamesList();
    }
}
