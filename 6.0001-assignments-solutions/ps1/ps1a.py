# House_Hunting. (A)

def house_hunting(annual_salary, percent_save, total_cost):
    monthly_salary = annual_salary / 12
    portion_down_payment = total_cost * 0.25
    current_savings = 0

    months = 0

    while current_savings < portion_down_payment:
        current_savings += current_savings * 0.04 / 12
        current_savings += percent_save * monthly_salary
        months += 1

    print(months)

annual_salary = float(input("Enter your annual salary: "))
percent_save = float(input("Enter the percent of your salary to save, as a decimal: "))
total_cost = float(input("Enter the cost of your dream home: "))

house_hunting(annual_salary, percent_save, total_cost)
