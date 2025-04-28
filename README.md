# Gruvy Drive

Gruvy Drive is a simple 'Google Drive' clone, designed to store and retrieve documents from anywhere. The project runs on Node.js, featuring a basic Express app that allows users to upload, download, and delete files from a specified server directory.

## Features

- **File Upload**: Upload files to the server directory.
- **File Download**: Download files from the server directory.
- **File Deletion**: Delete files from the server directory.

## Authorization and Security

> ⚠️ **Warning:** Do not run this app on an open network!

Currently, there is no built-in authorization or security since the app is not meant to run on the open internet. 
Access is controlled via a VPN (e.g., Tailscale). 
If the app is exposed to the internet, anyone could potentially upload, view, and delete files in the drive directory.

## How to Use

1. **Clone the repository**:
    ```bash
    git clone git@github.com:hstevenscli/gruvy-drive.git
    cd gruvy-drive
    ```

2. **Run the app**:
    ```bash
    node index.js
    ```

3. **Connect to the app**:

    - **From the same computer** (the app runs on port 8080 by default):
      ```
      http://localhost:8080
      ```

    - **From a different computer on the same network**:
      ```
      http://<IP-ADDRESS-OF-COMPUTER-RUNNING-APP>:8080
      ```

    - **Using a VPN like Tailscale**:
      ```
      http://<VPN-ASSIGNED-IP>:8080
      ```

## Example

In the picture below, if you are running the app on the device called 'desktop' you would type the following into your search bar:
```
http://100.105.6.121:8080
```

![Tailscale Example](./photos/tailscale_example.png)


