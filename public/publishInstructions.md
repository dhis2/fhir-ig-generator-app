## Publishing the Generated Implementation Guide (IG)

Follow the steps below to build the IG and view its contents:

#### 1. **Unzip the Generated IG Bundle**
- Extract the downloaded ZIP file into a directory of your choice.

#### 2. **Set Up Required Tools**
Ensure the following tools are installed and available in your environment:
- **[SUSHI](https://github.com/FHIR/sushi)**: For compiling FHIR Shorthand into FHIR definitions.
  ```bash
  npm install -g fsh-sushi
  ```
- **[Java JDK](https://www.oracle.com/java/technologies/downloads/)** (version 17 or higher): Required for running the IG Publisher.
- **[Ruby](https://www.ruby-lang.org/en/downloads/)** and **[Jekyll](https://jekyllrb.com/docs/installation/)**: Required for the IG Publisher.

#### 3. **Run the IG Publisher**
The IG Publisher will generate the IG content, validate it, and create a browsable website.

#### **Steps:**
1. Open a terminal and navigate to the extracted IG directory.
   ```bash
   cd path/to/ig
   ```
2. Run the `_updatePublisher` script to download the latest version of the IG Publisher:
   - **Linux/macOS**:
     ```bash
     ./_updatePublisher.sh
     ```
   - **Windows**:
     ```cmd
     _updatePublisher.bat
     ```
3. Run the `_genonce` script to generate the IG content:
   - **Linux/macOS**:
     ```bash
     ./_genonce.sh
     ```
   - **Windows**:
     ```cmd
     _genonce.bat
     ```

#### 4. **View the Generated IG**
1. Navigate to the `output` folder in the extracted IG directory.
2. Open the `index.html` file in a web browser.
3. Explore the IG, including the **Artifacts** tab, to view all generated FHIR artifacts.