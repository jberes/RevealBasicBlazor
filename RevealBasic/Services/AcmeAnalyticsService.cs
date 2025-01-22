using System.Net.Http.Json;
using RevealBasic.Models.AcmeAnalytics;

namespace RevealBasic.AcmeAnalytics
{
    public class AcmeAnalyticsService: IAcmeAnalyticsService
    {
        private readonly HttpClient _http;

        public AcmeAnalyticsService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<DashboardNames>> GetDashboardNamesList()
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri("https://acmeanalyticsserver.azurewebsites.net/dashboards/names", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<DashboardNames>>().ConfigureAwait(false);
            }

            return new List<DashboardNames>();
        }
    }
}
