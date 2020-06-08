# CloudOsaApp
Cloud Optical Spectrum Analyzer - an application that emulates a very basic text command interface of legacy laboratory equipment.

## Demo Link: http://50.17.50.104/

## Technologies:
 - Python for REST APIs
 - Angular 9 for developing the web application

## Application Features:
  - SINGLE button retrieves a single trace from the virtual OSA.
  - START button initiates continuous (repetitive) acquisition with ~1Hz(1 second) refresh rate.
  - STOP stops the acquisition.
  - Persist Data Feature: Two layers of data plotting is enabled for demonstration purposes but the application can support any number of plot layers. For example, there is a layer L1 (green) of data plotted on the graph, now if the user enables the `Persist Data` option by selecting `YES` and clicks on `SINGLE` button then a new layer L2 (red) of plot will be displayed. So there are two layers L1 and L2. If the user clicks again on `SINGLE` button the first layer L1 will be removed and a new layer L3 (green) will be added. The graph will displaying layers L2 and L3.
  - Logs section tracks all the user actions.
  - Command Console section allows the user to query the commands and see the result. For example, enter `trace` and the results will be displayed to the user.

## Steps to run the application on local system:
1. Execute command `git clone https://github.com/uanthwal/cloud-osa-app` in command prompt/Gitbash/Terminal to the clone the repository.
2. In the command prompt/Gitbash/Terminal window, navigate to the `backend` directory and execute the command: `pip install -r requirements.txt` to install all the Python packages used by this application.
3. Execute command: `python backend.py` to start the server code.
4. To run the web application locally there are two options:
    
    *a. Running the application from the source code
      1. Open command prompt and navigate to the root level of the cloned repository, execute command `npm install` to install the application dependencies.
      2. Execute command `ng serve` and a message will be displayed that the application is served on `http://localhost:4200`
      3. Open web browser and launch the application using `http://localhost:4200`
    
    *b. Running the application from the build
      1.  Open command prompt and execute command `npm install http-server -g` to install a lightweight http-server that will serve the web application locally.
      2. Navigate to the root level of the cloned repository and execute command: `http-server dist/cloud-osa-app` a message will be displayed that the application is running on `http://127.0.0.1:8080/`
      3. Open web browser and launch the application using `http://127.0.0.1:8080/`

