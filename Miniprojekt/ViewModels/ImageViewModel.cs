using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Miniprojekt.ViewModels
{
	public class ImageWordPair
	{
		public string imageUrl;
		public string imageWord;
	}

	public class ImageViewModel
	{
		public List<ImageWordPair> ImageList { get; set; }

		public ImageViewModel()
		{
			ImageList = new List<ImageWordPair>();
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild1.jpg", imageWord = "KATT" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild2.jpg", imageWord = "FOTBOLL" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild3.jpg", imageWord = "CYKEL" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild4.jpg", imageWord = "FISK" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild5.jpg", imageWord = "HUS" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild6.jpg", imageWord = "ANKA" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild7.jpg", imageWord = "FÅR" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild8.png", imageWord = "NYCKELPIGA" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild9.jpg", imageWord = "GLASÖGON" });
			ImageList.Add(new ImageWordPair { imageUrl = "/Content/Images/Games/bild10.jpg", imageWord = "STOL" });
		}
	}
}