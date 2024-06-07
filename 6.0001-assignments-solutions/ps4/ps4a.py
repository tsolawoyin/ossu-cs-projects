# Problem Set 4A
# Name: Olawoyin Temidayo
# Collaborators: none
# Time Spent: 2 days or so...

def shuffle(char, word):
    # the len of the char and word combines
    total = len(char + word) 
    insert = list()

    # iterating { total } number of times 
    for i in range(total):
        start = word[:i]
        insert.append(start + char + word[i:])
    
    return insert


def permutations(word):
    if (len(word) == 1):
        return [ word ]
    
    first_char = word[:1]
    calc = permutations(word[1:])

    res = []

    for el in calc:
        res.extend(shuffle(first_char, el))
    
    return res


def get_permutations(sequence):
    '''
    Enumerate all permutations of a given string

    sequence (string): an arbitrary string to permute. Assume that it is a
    non-empty string.  

    You MUST use recursion for this part. Non-recursive solutions will not be
    accepted.

    Returns: a list of all permutations of sequence

    Example:
    >>> get_permutations('abc')
    ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

    Note: depending on your implementation, you may return the permutations in
    a different order than what is listed here.
    '''
    # a non_recursive solution. I understand
    return permutations(sequence)

if __name__ == '__main__':
#    #EXAMPLE
    example_input = 'abc'
    print('Input:', example_input)
    print('Expected Output:', ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
    print('Actual Output:', get_permutations(example_input))
    
# #    # Put three example test cases here (for your sanity, limit your inputs
# #    to be three characters or fewer as you will have n! permutations for a 
# #    sequence of length n)
    
    pass
