1. $[L_1] = \begin{bmatrix} 1 & 2 \\ 1 & 1\end{bmatrix}$  Also, $[L_2] = \begin{bmatrix} 2 & 1 \\ -1 & 3 \end{bmatrix}$ 

   Hence, we see that every vector in $L_1$ is of the form $L_1(\vec{x}) = s \begin{bmatrix} 1 \\ 1 \end{bmatrix} + t \begin{bmatrix} 2 \\ 1 \end{bmatrix}$ for $s, t \in \Re$ 

   Similarly, $L_2(\vec{x}) = m \begin{bmatrix} 2 \\ -1 \end{bmatrix} + n \begin{bmatrix} 1\\ 3 \end{bmatrix}$ for $m, n \in \Re$ 

   $\implies Span\{L_1, L_2\} = Span\left \{\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 2 \\ -1 \end{bmatrix}, \begin{bmatrix} 1 \\ 3 \end{bmatrix}\right \}$ 

   If we consider the matrix $\begin{bmatrix} 1 & 2 & 2 & 1 \\ 1 & 1 & -1 & 3 \end{bmatrix}$ , we have that by the System Rank Theorem, it will have $4 - 2 = 2$ free variables for the equation $A\vec{x} = \vec{0}$ . Hence, since we have a non-zero solution to the equation, we have that the set is not linearly independent. Hence, any one of the column vector is a linear combination of the others. Lets assume column 4, and remove it from the set. We still have that the span is the same. Similarly, for the matrix $\begin{bmatrix} 1&2&2 \\ 1&1&-1 \end{bmatrix}$ we have that, since there is a free variable when we solve the equation $A\vec{x} = \vec{0}$, we have that by the SR Theorem again, the third vector can be expressed as a linear combination of the other two column vectors (also because the other two column vectors are non-collinear). 

   Now, in the matrix $\begin{bmatrix} 1&2 \\ 1&1 \end{bmatrix}$, by the System Rank Theorem, since the rank of the matrix is equal to the number of variables, we have that there will be a unique solution to any given $\vec{b} \in \Re^2$. Hence, we have that $Span \left\{ \begin{bmatrix} 1 \\1 \end{bmatrix}, \begin{bmatrix} 2 \\ 1 \end{bmatrix} \right\} = \Re^2$ 

   $<<<<<TO \ \ BE \ \ CONTINUED>>>>>>>$ 

2. a) The condition is, $a - b + 3 = 0 \iff a + 3 = b$

   Hence consider the two elements of $S_1$, $\vec{x} = \begin{bmatrix} a_1&(a_1+3) \\ c_1 & d_1 \end{bmatrix}$ and $\vec{y} = \begin{bmatrix} a_2&(a_2+3) \\ c_2 & d_2 \end{bmatrix}$ . 

   We know that $M_{2 \times 2}(\Re)$ is a vector space. Since $S_1 \subseteq M_{2 \times 2}(\Re)$, it suffices to prove that $(\vec{x} + \vec{y}) \in S_1$ and $c \vec{x} \in S_1$ for $c \in \Re$ 

   $ \vec{x} + \vec{y} = \begin{bmatrix} a_1&(a_1+3) \\ c_1 & d_1 \end{bmatrix} + \begin{bmatrix} a_2&(a_2+3) \\ c_2 & d_2 \end{bmatrix} = \begin{bmatrix} (a_1 + a_2)&(a_1+3) + (a_2 + 3) \\ (c_1 + c_2) & (d_1 + d_2) \end{bmatrix} = $

   $\begin{bmatrix} (a_1 + a_2)&(a_1+a_2 + 6) \\ (c_1 + c_2) & (d_1 + d_2) \end{bmatrix}$ . Here, clearly, if $(a_1 + a_2) = a$, then we have that $b = a + 6 \neq a + 3$, which means that the $S_1$ is not a vector space, because it doesn't pass the Subspace Test.

   b) Consider two elements in $S_2$, $\vec{x} = a_1 + b_1x + c_1x^2$ where $a_1 = 2c_1 + 3b_1$, and also, another element       $ \vec{y} = a_2 + b_2x + c_2x^2$  where $a_2 = 2c_2 + 3b_2$

   Here, to prove if $S_2$ is a Vector space, since $S_2 \subseteq P_2(\Re)$, it suffices to check if $S_2$ passes the Subspace Test.

   $\vec{x} + \vec{y} = (a_1 + b_1x + c_1x^2) + (a_2 + b_2x + c_2x^2) $

   $= ((2c_1 + 3b_1) + b_1x + c_1x^2) + ((2c_2 + 3b_2) + b_2x + c_2x^2)$

   $= (2c_1 + 3b_1 + 2c_2 + 3b_2) + (b_1 + b_2)x + (c_1 + c_2)x^2$ 

   $= (2(c_1 + c_2) + 3(b_1 + b_2)) + (b_1 + b_2)x + (c_1 + c_2)x^2$ 

   Here, if we let $(c_1 + c_2) = c$, $(b_1 + b_2) = b$, then we see that 

   $2(c_1 + c_2) + 3(b_1 + b_2) = 2c + 3b = a \implies$ the resulting equation $z$ is of the form $a + bx +  cx^2$, and so, $z \in S_2$ 

   Consider an arbitrary value $m \in \Re$, $\vec{x} \in S_2$. 

   Consider $m\vec{x} = m(a + bx + cx^2) = m( (2c + 3b) + bx + cx^2) = (2mc + 3mb) + mbx + mcx^2$

   Again, here we have the equation in the same form, where $a_0 = 2c_0 + 3b_0 $ if $b_0 = mb \ \ and \ \ c_0 = mb$ 

   Hence, $m\vec{x} \in S_2$, and since both the Subspace test has passed, $S_2$ is a Subspace of $P_2(\Re)$ 

3. ​