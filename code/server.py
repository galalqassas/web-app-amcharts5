# Import necessary libraries
import pandas as pd
from flask import Flask, jsonify, render_template
import sqlite3
from flask_sqlalchemy import SQLAlchemy

# Set the path to the database file 
root_path = r'C:\Users\PC\Desktop\Galal Qassas - 202201379\code\database.db'

# Initialize Flask app
app = Flask(__name__)
# Configure database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + root_path
db = SQLAlchemy(app)

# Define the root endpoint
@app.route('/')
def index():
    # Render the main page
    return render_template('index.html')

# Define endpoint to fetch profit data by month
@app.route('/get-profit-by-month')
def get_profit_by_month():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # Prepare SQL query to aggregate profit by month
    query = """
    SELECT Month, SUM(Profit) FROM Company
    GROUP BY Month
    ORDER BY CASE SUBSTR(Month, 1, 3) 
        WHEN 'Jan' THEN 1 
        WHEN 'Feb' THEN 2 
        WHEN 'Mar' THEN 3 
        WHEN 'Apr' THEN 4 
        WHEN 'May' THEN 5 
        WHEN 'Jun' THEN 6 
        WHEN 'Jul' THEN 7 
        WHEN 'Aug' THEN 8 
        WHEN 'Sep' THEN 9 
        WHEN 'Oct' THEN 10 
        WHEN 'Nov' THEN 11 
        WHEN 'Dec' THEN 12 
    END
    """
    # Execute the query
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    # Close the database connection
    conn.close()

    # Process and structure the data for response
    data = [{'month': row[0], 'value': int(row[1])} for row in data_grouped]
    # Return the data as a JSON response
    return jsonify(data)

# Route to get profit by region
@app.route('/get-profit-by-region')
def get_datachart2():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # SQL query to aggregate profit by region
    query = "SELECT Region, SUM(Profit) FROM Company GROUP BY Region"
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    conn.close()  # Close the connection

    # Convert data to a list of dictionaries
    data = [{'region': row[0], 'value': int(row[1])} for row in data_grouped]
    return jsonify(data)  # Return the data as JSON

# Route to get average cost, profit, and revenue by branch
@app.route('/get-cost-profit-revenue-by-branch')
def get_datachart3():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # SQL query to get averages of cost, profit, and revenue by branch
    query = "SELECT Branch, AVG(Cost), AVG(Profit), AVG(Revenue) FROM Company GROUP BY Branch"
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    conn.close()

    # Convert data to a list of dictionaries
    data = [{'branch': row[0], 'cost': int(row[1]), 'profit': int(row[2]), 'revenue': int(row[3])} for row in data_grouped]
    return jsonify(data)

# Route to get profit by product
@app.route('/get-profit-by-product')
def get_datachart4():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # SQL query to aggregate profit by product
    query = "SELECT Product, SUM(Profit) FROM Company GROUP BY Product"
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    conn.close()

    # Convert data to a list of dictionaries
    data = [{'product': row[0], 'profit': int(row[1])} for row in data_grouped]
    return jsonify(data)

# Route to get cost by product
@app.route('/get-cost-by-product')
def get_datachart5():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # SQL query to aggregate cost by product
    query = "SELECT Product, SUM(Cost) FROM Company GROUP BY Product"
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    conn.close()

    # Convert data to a list of dictionaries
    data = [{'product': row[0], 'cost': int(row[1])} for row in data_grouped]
    return jsonify(data)


# Route to get revenue by year and product
@app.route('/get-revenue-by-year-product')
def get_datachart6():
    # Connect to the database
    conn = sqlite3.connect(root_path)
    cursor = conn.cursor()

    # SQL query to aggregate revenue by year and product
    query = "SELECT Year, Product, SUM(Revenue) FROM Company GROUP BY Year, Product"
    cursor.execute(query)
    data_grouped = cursor.fetchall()
    conn.close()  # Close the connection

    # Extract unique years from the dataset
    years = list(set([row[0] for row in data_grouped]))

    data = []
    # Organize data by year, with revenue for each product
    for year in years:
        dict_d = {'year': str(year)}
        year_data = [(row[1], int(row[2])) for row in data_grouped if row[0] == year]
        for item in year_data:
            dict_d[item[0]] = item[1]
        data.append(dict_d)

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')