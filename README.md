# Donations-Banners
A banner to show donations received. The donations are taken from an API and rendered into the banner.

You can see it live using any of the links below:

https://jonathlan.github.io/Donations-Banners/

https://donnations-banners.netlify.app/

# Controls
The tool allows user to play or pause the rotation of donations, which happens to a default delay of 8 seconds.

## Play
Starts the donation rotation after 8 seconds and each donation is displayed for 8 seconds each. At the end of the list the first donation is displayed again.

## Pause
Pauses the rotation at the current donation.

## Demo mode
The de mode will take the list of donations from a demo file, located in: `demo/endpoint.json`

## Status
Displays the status of the tool:

### Playing
The tool displays the donations retrieved from the API, one by one with a delay of 8 seconds by default.

### Paused
Rotation is paused. Click `Play` to resume.

# FAQ
### The banner doesn't refresh
Check how many donations are in the API. If there's only one, the tool will rotate on that over an over again

### I clicked play, but nothing happens
Wait for a few seconds, it will refresh after the timeout is reached. 8 seconds by default.

### How can I change the banner background.
This can be changed from `img/banner-background.png`
