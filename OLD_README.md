## Welcome to the Boxphish tech test

#### Version 1.0.0

This technical test is designed to assess your ability to understand structured data, transform datasets, and produce an output that aligns with a predefined schema. The dataset provided includes various fields with randomly generated information. Your task is to interpret the data, understand the requirements, and implement a solution that meets the project's goals.

There are no restrictions on the tools, libraries, or programming languages you choose to use. The approach you take is entirely up to you, and you are encouraged to make decisions that you believe are most effective and efficient. Your solution should demonstrate your problem-solving skills and attention to detail.

Please include any instructions or notes necessary for running your solution, along with any assumptions or decisions made during the process.

### Project goals

- Read the provided dataset (`files/users.csv`) and extract the information.
- Transform the data to match the predefined CSV schema (`schema/csv.output.json`), and **create a new CSV file** with the transformed data bound to the columns found in the schema.
- Include comments and documentation where necessary to explain your thought process and implementation.

### About the dataset

The dataset is a fake CSV file that represents a list of users found in a database that has been breached and published onto the dark web. None of the data is real and has been generated for the purpose of this test, but strongly resembles the type of data that might be found in a real-world scenario.

### Bonus points

- Explain how you would approach this task if the file were to contain millions of rows. Would your solution scale? If not, what changes would you make?
- Some of the rows in the data contain errors, missing information, or in some cases missing passwords. How would you handle these situations in your solution?

### Available files:

```
.
├── README.md
├── files
│   ├── supplementary
│   │   └── rainbow_table.csv
│   └── users.csv
└── schema
    └── csv.output.json
```
