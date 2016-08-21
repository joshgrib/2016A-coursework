// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

//R0 -> x
@R0
D=M
@x
M=D

//R1 -> y
@R1
D=M
@y
M=D

@0
D=A
@R2
M=D
@i
M=D
@res
M=D
(LOOP)
    @i
    D=M
    @x
    D=D-M
    @STORE
    D;JEQ
    @y
    D=M
    @res
    M=D+M
    @i
    M=M+1
    @LOOP
    0;JMP

(STORE)
    @res
    D=M
    @R2
    M=D

(STOP)
    @STOP
    0;JMP
