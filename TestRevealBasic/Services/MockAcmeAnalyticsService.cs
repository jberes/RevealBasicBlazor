using RevealBasic.Models.AcmeAnalytics;

namespace RevealBasic.AcmeAnalytics
{
    public class MockAcmeAnalyticsService : IAcmeAnalyticsService
    {
        public Task<List<DashboardNames>> GetDashboardNamesList()
        {
            return Task.FromResult<List<DashboardNames>>(new());
        }
    }
}
