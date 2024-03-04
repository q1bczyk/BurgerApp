using api._Helpers;
using api._Interfaces;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.Extensions.Options;

namespace api._Services
{
    public class FileService : IFileService
    {
        private readonly BlobContainerClient filesContainer;
        private readonly string AccountName; 
        private readonly string Key;
    
        public FileService(IOptions<BlobStorageSettings> config)
        {
            this.AccountName = config.Value.AccountName;
            this.Key = config.Value.Key;

            string blobConnection = $"DefaultEndpointsProtocol=https;AccountName={AccountName};AccountKey={Key};EndpointSuffix=core.windows.net";

            this.filesContainer = new BlobContainerClient(blobConnection, config.Value.ContainerName);
        }

        public async Task<string> UploadFileAsync(IFormFile file, string fileName)
        {
                 string fileExtension = Path.GetExtension(file.FileName)?.TrimStart('.').ToLower();

                using(Stream stream = file.OpenReadStream())
                {
                    var response = await filesContainer.UploadBlobAsync($"{fileName}.{fileExtension}", stream);
                    
                    if (response.GetRawResponse().Status == 201 || response.GetRawResponse().Status == 200)
                        return filesContainer.GetBlobClient($"{fileName}.{fileExtension}").Uri.ToString();

                    return null;
                }
        }

        public async Task<bool> DeleteFileAsync(string imgUrl)
        {
            var uri = new Uri(imgUrl);
            var blobPath = uri.LocalPath.TrimStart('/').Replace("burger-app/", "");
            var fileToDelete = filesContainer.GetBlobClient(blobPath);

            if(await fileToDelete.ExistsAsync())
            {
                await fileToDelete.DeleteIfExistsAsync();
                return true;
            }

            return false;
                
        }   

        public async Task<string> GeneratePublicLink(string imgUrl)
        {
            var blobClient = new BlobClient(new Uri(imgUrl), new StorageSharedKeyCredential(AccountName, Key));
            
            var sasBuilder = new BlobSasBuilder
            {
                StartsOn = DateTimeOffset.UtcNow,
                ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), 
                Resource = "b",
            };

            sasBuilder.SetPermissions("rw");

            var sasToken = blobClient.GenerateSasUri(sasBuilder);
            var publicUrl = sasToken.ToString();

            return publicUrl;
        }

         public bool IsFileExtensionAllowed(IFormFile file)
        {
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName)?.ToLower();
            return allowedExtensions.Contains(extension);
        }

    }
}