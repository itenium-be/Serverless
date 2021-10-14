using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Octokit;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace PostLikeFunction
{
   public static class Function1
   {
      [FunctionName("Function1")]
      public static async Task<IActionResult> Run(
         [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
         ILogger log)
      {
         log.LogInformation("C# HTTP trigger function processed a request.");

         string name = req.Query["name"];

         string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
         var data = JsonConvert.DeserializeObject<Post>(requestBody);


         var client = new GitHubClient(new ProductHeaderValue("like-faas"));

         var repo = await client.Repository.Get("itenium-be", "itenium-be.github.io");

         var dataFiles = await client.Repository.Content.GetAllContents(repo.Id, "_data/blog-likes.yml");

         var dataFile = dataFiles.FirstOrDefault();

         var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance)
            .Build();


         var posts = deserializer.Deserialize<IEnumerable<Post>>(dataFile.Content);

         var responseMessage = JsonConvert.SerializeObject(posts);

         return new OkObjectResult(responseMessage);




      }
   }

   public class Post
   {
      public string Url { get; set; }
      public int Likes { get; set; }
   }
}
