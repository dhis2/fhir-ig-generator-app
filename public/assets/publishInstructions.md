# Publishing Your Implementation Guide (IG)

## Overview
This guide will help you build and view the Implementation Guide you have generated.

## Prerequisites
Before starting, ensure you have the following tools installed:

* **[SUSHI](https://github.com/FHIR/sushi)**: Compiles FHIR Shorthand into FHIR definitions
  ```bash
  npm install -g fsh-sushi
  ```
* **[Java JDK](https://www.oracle.com/java/technologies/downloads/)** (version 17+): Required for the IG Publisher
* **[Ruby](https://www.ruby-lang.org/en/downloads/)** and **[Jekyll](https://jekyllrb.com/docs/installation/)**: Required for the IG Publisher

## Step-by-Step Instructions

### 1. Extract the IG Package
Extract the downloaded ZIP file to a directory of your choice.

### 2. Update the IG Publisher
Open a terminal and navigate to the extracted directory:
```bash
cd path/to/ig
```

Run the update script:
* **Linux/macOS**:
  ```bash
  ./_updatePublisher.sh
  ```
* **Windows**:
  ```cmd
  _updatePublisher.bat
  ```

### 3. Generate the IG Content
Run the generation script:
* **Linux/macOS**:
  ```bash
  ./_genonce.sh
  ```
* **Windows**:
  ```cmd
  _genonce.bat
  ```

### 4. View the Generated IG
1. Navigate to the `output` folder in your extracted directory
2. Open `index.html` in your web browser
3. Browse the **Artifacts** tab to explore all generated FHIR resources