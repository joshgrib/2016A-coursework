#Assembler from .asm --> .hack
import sys
import os

#Set up tables to easily switch from symbols to binary
jump_to_bin = {}
jump_to_bin['null'] = '000'
jump_to_bin['JLE'] = '110'
jump_to_bin['JNE'] = '101'
jump_to_bin['JEQ'] = '010'
jump_to_bin['JMP'] = '111'
jump_to_bin['JGE'] = '011'
jump_to_bin['JLT'] = '100'
jump_to_bin['JGT'] = '001'

dest_to_bin = {}
dest_to_bin['A'] = '100'
dest_to_bin['M'] = '001'
dest_to_bin['D'] = '010'
dest_to_bin['AM'] = '101'
dest_to_bin['MD'] = '011'
dest_to_bin['AD'] = '110'
dest_to_bin['AMD'] = '111'
dest_to_bin['null'] = '000'

comp_to_bin = {}
comp_to_bin['0'] = '110101010'
comp_to_bin['1'] = '110111111'
comp_to_bin['-1'] = '110111010'
comp_to_bin['D'] = '110001100'
comp_to_bin['A'] = '110110000'
comp_to_bin['M'] = '111110000'
comp_to_bin['!D'] = '110001101'
comp_to_bin['!A'] = '110110001'
comp_to_bin['!M'] = '111110001'
comp_to_bin['-D'] = '110001111'
comp_to_bin['-A'] = '110110011'
comp_to_bin['-M'] = '111110011'
comp_to_bin['D<<'] = '010110000'
comp_to_bin['D>>'] = '010010000'
comp_to_bin['A<<'] = '010100000'
comp_to_bin['A>>'] = '010000000'
comp_to_bin['M<<'] = '011100000'
comp_to_bin['M>>'] = '011000000'
comp_to_bin['D&A'] = '110000000'
comp_to_bin['D&M'] = '111000000'
comp_to_bin['D|A'] = '110010101'
comp_to_bin['D|M'] = '111010101'
comp_to_bin['D+1'] = '110011111'
comp_to_bin['A+1'] = '110110111'
comp_to_bin['M+1'] = '111110111'
comp_to_bin['D+A'] = '110000010'
comp_to_bin['D+M'] = '111000010'
comp_to_bin['D-1'] = '110001110'
comp_to_bin['A-1'] = '110110010'
comp_to_bin['M-1'] = '111110010'
comp_to_bin['D-A'] = '110010011'
comp_to_bin['D-M'] = '111010011'
comp_to_bin['A-D'] = '110000111'
comp_to_bin['M-D'] = '111000111'

#set up table for register and keywords
symbol_table = {}
for i in range(0,16):
    symbol_table['R'+str(i)] = str(i)
symbol_table['SP'] = 0
symbol_table['LCL'] = 1
symbol_table['ARG'] = 2
symbol_table['THIS'] = 3
symbol_table['THAT'] = 4
symbol_table['SCREEN'] = 16384
symbol_table['KBD'] = 24576

def dec_to_bin(num):
    #take a decimal number, return binary
    binary = int(num)
    binary = int(bin(binary)[2:])
    binary_string = str(binary)
    diff = 16 - len(binary_string)
    return "0" * diff + binary_string

def parse(line):
    #parse a line and turn instructions into binary
    dest = "null"
    jump = "null"
    first_part = line
    if ";" in line:
        jump = line.rsplit(';', 1)[1]
        jump = jump.strip()
        first_part = line.rsplit(';', 1)[0]
    comp = first_part
    if "=" in first_part:
        comp = first_part.rsplit('=', 1)[1]
        comp = comp.strip()
        dest = first_part.rsplit('=', 1)[0]
        dest = dest.strip()
    return "1" + comp_to_bin[comp] + dest_to_bin[dest] + jump_to_bin[jump]


#BEGIN SCRIPT
file_name = sys.argv[1]

asm_f = open(file_name, 'r')
name = file_name.rsplit('.', 1)[0]
hack_f = open(name+".hack", 'w')

lines_count = 0
for line in asm_f:
    new_line = line.strip()
    if new_line != '' and not new_line.startswith('//') and not new_line.startswith('('):
        lines_count += 1
    elif new_line.startswith('('):
        if '//' in new_line:
            new_line = new_line[:new_line.find("//")]
            new_line = new_line.strip()
        table_name = new_line.rsplit(')', 1)[0]
        table_name = table_name.rsplit('(', 1)[1]
        symbol_table[table_name] = lines_count

asm_f.seek(0)

num_line = 16
for line in asm_f:
    new_line = line.strip()
    if new_line == '' or new_line.startswith('//') or new_line.startswith('('):
        continue
    if '//' in new_line:
        new_line = new_line[:new_line.find("//")]
        new_line = new_line.strip()
    if new_line.startswith('@'):
        addr = new_line.rsplit('@', 1)[1]
        if not addr.isdigit():
            if addr in symbol_table:
                addr = symbol_table[addr]
            else:
                symbol_table[addr] = num_line
                addr = num_line
                num_line += 1
        addr = dec_to_bin(addr)
        hack_f.write(addr+"\n")
    else:
        hack_f.write(parse(new_line)+"\n")

asm_f.close()
hack_f.close()
