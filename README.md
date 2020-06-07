# CloudOsaApp
Cloud Optical Spectrum Analyzer - an application that emulates a very basic text command interface of legacy laboratory equipment.

## Demo Link: http://50.17.50.104/

## Technologies:
 - Python
 - Angular 9

## Application Features:
  - SINGLE button retrieves a single trace from the virtual OSA.
  - START button initiates continuous (repetitive) acquisition with ~1Hz(1 second) refresh rate.
  - STOP stops the acquisition.
  - Persist Data Feature: Two layers of data plotting is enabled for demonstration purposes but the application can support any number of plot layers. Suppose there is a layer L1 (green) of data plotted on the graph now if the user enables the `Persist Data` option and clicks on `SINGLE` button again a new layer L2 (red) of plot will be displayed. So there are two layers L1 and L2. If the user clicks again on `SINGLE` button the first layer L1 will be removed and a new layer L3 (green) will be added. The graph will have L2 and L3.
  - Logs section tracks all the user actions.
  - Command Console section allows the user to query the commands and see the result. For example, enter `trace` and the results will be displayed to the user.

## Steps to run the application on local:
1. Clone the repository using command: `git clone https://github.com/uanthwal/cloud-osa-app`
2. Run the command `npm install http-server -g` to install a lightweight http-server that will serve the angular application
3. Navigate to the backend directory and execute the command: `pip install -r requirements.txt` to install all the Python packages used by this application
4. Execute command: `python backend.py` to start the server code
5. Open another tab and navigate to root of the cloned repository and execute command: `http-server dist/cloud-osa-app` `http://127.0.0.1:8080/`

