Itenium Blog
============

```sh
npm install -g azure-functions-core-tools@3 --unsafe-perm true
```

VSCode Plugin: ms-azuretools.vscode-azurefunctions  
Control + Shift + A > Sign in to Azure...

Or direct support in Visual Studio.

Or use the AZ CLI:  
https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli

```ps1
az login
```

Create new
----------

```ps1
func init
func new

# Locally
func start

# Deploy
func azure functionapp publish ServerlessBlog
```


Azure Storage Emulator
----------------------

https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator

```
AzureStorageEmulator.exe init
AzureStorageEmulator.exe start
```
