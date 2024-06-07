
"""
This exercise is solved by modifying ps1b.
I solved it using a bisection search that
looks for a best rate to save between 1 - 10000

The 'low' and 'high' variable specifies the 'min' and 'max' respectively.

And the while loop keeps running until the "difference" between the portion_down_payment and current_savings is less than 100, which made sense because there are only two possibilities:

1) either the savings exceeds the down payment by ($100-$0), which the person can use for other bills after buying the house
2) or the savings is below the down payment by ($100-$0), which a person earning more than $100,000 can easily get either from his side cash or even borrow from a friend or relative.

In summary, once we have a savings that is either ($100-$0) greater than or less than the down payment, we will display the guess_rate. 

The for loop does the calculation, the while loop do the guessing.

Thank you :)
"""

def house_hunting(annual_salary, total_cost, semi_annual_raise):
    
    monthly_salary = annual_salary / 12
    portion_down_payment = 0.25 * total_cost
    current_savings = 0
    
    low = 0
    high = 10000

    guess_rate = (low + high) / 2
    difference = 250000
    step = 0

    while difference > 100:
        step += 1
        for month in range(1, 37):
            current_savings += current_savings * 0.04 / 12
            current_savings += (guess_rate / 100) * monthly_salary

            if month % 6 == 0:
                monthly_salary += (monthly_salary * semi_annual_raise)

        difference = current_savings - portion_down_payment

        if difference > 100:
            high = guess_rate
        if difference < 0:
            low = guess_rate
        
        difference = abs(difference)

        guess_rate = (low + high) / 2
        current_savings = 0
        monthly_salary = annual_salary / 12

    if guess_rate/100 > 1:
        print("It is not possible to pay the down payment in three years.")
        return
    print(guess_rate/100)
    print(step)
        
annual_salary = float(input("Enter your annual salary: "))
total_cost = float(input("Enter the cost of your dream home: "))
semi_annual_raise = float(input("Enter the semi-annual raise, as a decimal: "))

house_hunting(annual_salary, total_cost, semi_annual_raise)