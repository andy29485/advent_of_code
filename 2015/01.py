#!/bin/env python3

with open('inputs/01.txt', 'r') as f:
    string = f.read().strip()

floor = 0
f_bas = 0
for i,c in enumerate(string):
    if c == '(':
        floor += 1
    elif c == ')':
        floor -= 1
    if not f_bas and floor == -1:
        f_bas = i+1

print(f'part 1: {floor}')
print(f'part 2: {f_bas}')
