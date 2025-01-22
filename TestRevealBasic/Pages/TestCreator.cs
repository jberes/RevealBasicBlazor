using Bunit;
using Microsoft.Extensions.DependencyInjection;
using RevealBasic.Pages;

namespace TestRevealBasic
{
	[Collection("RevealBasic")]
	public class TestCreator
	{
		[Fact]
		public void ViewIsCreated()
		{
			using var ctx = new TestContext();
			ctx.JSInterop.Mode = JSRuntimeMode.Loose;
			var componentUnderTest = ctx.RenderComponent<Creator>();
			Assert.NotNull(componentUnderTest);
		}
	}
}
