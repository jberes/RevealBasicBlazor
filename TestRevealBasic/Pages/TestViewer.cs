using Bunit;
using Microsoft.Extensions.DependencyInjection;
using RevealBasic.Pages;
using RevealBasic.AcmeAnalytics;

namespace TestRevealBasic
{
	[Collection("RevealBasic")]
	public class TestViewer
	{
		[Fact]
		public void ViewIsCreated()
		{
			using var ctx = new TestContext();
			ctx.JSInterop.Mode = JSRuntimeMode.Loose;
			ctx.Services.AddIgniteUIBlazor(
				typeof(IgbListModule),
				typeof(IgbAvatarModule));
			ctx.Services.AddScoped<IAcmeAnalyticsService>(sp => new MockAcmeAnalyticsService());
			var componentUnderTest = ctx.RenderComponent<Viewer>();
			Assert.NotNull(componentUnderTest);
		}
	}
}
