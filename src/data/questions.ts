export interface DebugQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  buggyCode: string;
  correctCode: string;
  hints: string[];
  expectedOutput: string;
  errorDescription: string;
  points: number;
  timeLimit: number; // seconds
}

export const questions: DebugQuestion[] = [
  // EASY
  {
    id: "e1",
    title: "Missing Semicolon",
    description: "Fix the syntax error in this Hello World program.",
    difficulty: "easy",
    buggyCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n")
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    hints: ["Look at the end of the printf line.", "C statements must end with a semicolon."],
    expectedOutput: "Hello, World!",
    errorDescription: "error: expected ';' before 'return'",
    points: 100,
    timeLimit: 120,
  },
  {
    id: "e2",
    title: "Wrong Format Specifier",
    description: "Fix the format specifier to correctly print an integer.",
    difficulty: "easy",
    buggyCode: `#include <stdio.h>

int main() {
    int age = 25;
    printf("Age: %f\\n", age);
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    int age = 25;
    printf("Age: %d\\n", age);
    return 0;
}`,
    hints: ["%f is for floating-point numbers.", "Use %d for integers."],
    expectedOutput: "Age: 25",
    errorDescription: "warning: format '%f' expects 'double', but argument has type 'int'",
    points: 100,
    timeLimit: 120,
  },
  {
    id: "e3",
    title: "Missing Return Type",
    description: "Fix the function declaration to include the proper return type.",
    difficulty: "easy",
    buggyCode: `#include <stdio.h>

main() {
    printf("C Programming\\n");
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    printf("C Programming\\n");
    return 0;
}`,
    hints: ["The main function needs a return type.", "main() should return an int."],
    expectedOutput: "C Programming",
    errorDescription: "warning: return type defaults to 'int'",
    points: 100,
    timeLimit: 120,
  },
  {
    id: "e4",
    title: "Uninitialized Variable",
    description: "Fix the variable usage issue in this program.",
    difficulty: "easy",
    buggyCode: `#include <stdio.h>

int main() {
    int sum;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`,
    hints: ["What is the initial value of sum?", "Initialize sum to 0 before the loop."],
    expectedOutput: "Sum: 15",
    errorDescription: "warning: 'sum' is used uninitialized",
    points: 100,
    timeLimit: 120,
  },
  {
    id: "e5",
    title: "Missing Header",
    description: "This program is missing a required header file.",
    difficulty: "easy",
    buggyCode: `int main() {
    printf("Include me!\\n");
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    printf("Include me!\\n");
    return 0;
}`,
    hints: ["printf is declared in a standard library header.", "Add #include <stdio.h> at the top."],
    expectedOutput: "Include me!",
    errorDescription: "error: implicit declaration of function 'printf'",
    points: 100,
    timeLimit: 120,
  },
  // MEDIUM
  {
    id: "m1",
    title: "Off-By-One Array Access",
    description: "Fix the array bounds error in this program.",
    difficulty: "medium",
    buggyCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i <= 5; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
    hints: ["Array indices go from 0 to size-1.", "Change <= to < in the loop condition."],
    expectedOutput: "10 20 30 40 50",
    errorDescription: "Undefined behavior: accessing arr[5] out of bounds",
    points: 200,
    timeLimit: 180,
  },
  {
    id: "m2",
    title: "Pointer Dereferencing Bug",
    description: "Fix the pointer issue causing a segmentation fault.",
    difficulty: "medium",
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr;
    *ptr = 42;
    printf("Value: %d\\n", *ptr);
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(sizeof(int));
    *ptr = 42;
    printf("Value: %d\\n", *ptr);
    free(ptr);
    return 0;
}`,
    hints: ["The pointer is not pointing to allocated memory.", "Use malloc() to allocate memory before dereferencing."],
    expectedOutput: "Value: 42",
    errorDescription: "Segmentation fault (core dumped)",
    points: 200,
    timeLimit: 180,
  },
  {
    id: "m3",
    title: "String Comparison Error",
    description: "Fix the string comparison in this program.",
    difficulty: "medium",
    buggyCode: `#include <stdio.h>

int main() {
    char name[] = "Alice";
    if (name == "Alice") {
        printf("Hello, Alice!\\n");
    } else {
        printf("Who are you?\\n");
    }
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <string.h>

int main() {
    char name[] = "Alice";
    if (strcmp(name, "Alice") == 0) {
        printf("Hello, Alice!\\n");
    } else {
        printf("Who are you?\\n");
    }
    return 0;
}`,
    hints: ["You can't compare strings with == in C.", "Use strcmp() from <string.h>."],
    expectedOutput: "Hello, Alice!",
    errorDescription: "warning: comparison with string literal results in unspecified behavior",
    points: 200,
    timeLimit: 180,
  },
  {
    id: "m4",
    title: "Memory Leak",
    description: "Fix the memory management issue in this program.",
    difficulty: "medium",
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    for (int i = 0; i < 3; i++) {
        int *arr = (int *)malloc(10 * sizeof(int));
        arr[0] = i;
        printf("Allocated: %d\\n", arr[0]);
    }
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    for (int i = 0; i < 3; i++) {
        int *arr = (int *)malloc(10 * sizeof(int));
        arr[0] = i;
        printf("Allocated: %d\\n", arr[0]);
        free(arr);
    }
    return 0;
}`,
    hints: ["Memory allocated with malloc must be freed.", "Add free(arr) inside the loop after use."],
    expectedOutput: "Allocated: 0\nAllocated: 1\nAllocated: 2",
    errorDescription: "Memory leak: allocated memory is never freed",
    points: 200,
    timeLimit: 180,
  },
  {
    id: "m5",
    title: "Infinite Loop Bug",
    description: "Fix the loop that never terminates.",
    difficulty: "medium",
    buggyCode: `#include <stdio.h>

int main() {
    unsigned int i = 10;
    while (i >= 0) {
        printf("%u ", i);
        i--;
    }
    return 0;
}`,
    correctCode: `#include <stdio.h>

int main() {
    int i = 10;
    while (i >= 0) {
        printf("%d ", i);
        i--;
    }
    return 0;
}`,
    hints: ["An unsigned int can never be negative.", "Change unsigned int to int."],
    expectedOutput: "10 9 8 7 6 5 4 3 2 1 0",
    errorDescription: "Program hangs: unsigned integer wraps around, never < 0",
    points: 200,
    timeLimit: 180,
  },
  // HARD
  {
    id: "h1",
    title: "Dangling Pointer",
    description: "Fix the dangling pointer issue in this linked list operation.",
    difficulty: "hard",
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int data) {
    Node n;
    n.data = data;
    n.next = NULL;
    return &n;
}

int main() {
    Node *head = createNode(10);
    printf("Data: %d\\n", head->data);
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int data) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = data;
    n->next = NULL;
    return n;
}

int main() {
    Node *head = createNode(10);
    printf("Data: %d\\n", head->data);
    free(head);
    return 0;
}`,
    hints: ["Local variables are destroyed when a function returns.", "Allocate the node on the heap with malloc."],
    expectedOutput: "Data: 10",
    errorDescription: "warning: function returns address of local variable",
    points: 300,
    timeLimit: 300,
  },
  {
    id: "h2",
    title: "Buffer Overflow",
    description: "Fix the buffer overflow vulnerability in this program.",
    difficulty: "hard",
    buggyCode: `#include <stdio.h>
#include <string.h>

void greet(char *input) {
    char buffer[8];
    strcpy(buffer, input);
    printf("Hello, %s!\\n", buffer);
}

int main() {
    char name[] = "Alexander";
    greet(name);
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <string.h>

void greet(char *input) {
    char buffer[64];
    strncpy(buffer, input, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\\0';
    printf("Hello, %s!\\n", buffer);
}

int main() {
    char name[] = "Alexander";
    greet(name);
    return 0;
}`,
    hints: ["The buffer is too small for the input.", "Use strncpy with a size limit and a larger buffer."],
    expectedOutput: "Hello, Alexander!",
    errorDescription: "Stack smashing detected: buffer overflow in strcpy",
    points: 300,
    timeLimit: 300,
  },
  {
    id: "h3",
    title: "Race Condition in Shared Data",
    description: "Fix the data race in this multi-value computation.",
    difficulty: "hard",
    buggyCode: `#include <stdio.h>

int counter = 0;

void increment() {
    for (int i = 0; i < 1000; i++) {
        int temp = counter;
        temp = temp + 1;
        counter = temp;
    }
}

int main() {
    increment();
    increment();
    printf("Counter: %d\\n", counter);
    // Expected: 2000, but gets wrong value
    // because counter is not being reset properly
    return 0;
}`,
    correctCode: `#include <stdio.h>

void increment(int *counter) {
    for (int i = 0; i < 1000; i++) {
        (*counter)++;
    }
}

int main() {
    int counter = 0;
    increment(&counter);
    increment(&counter);
    printf("Counter: %d\\n", counter);
    return 0;
}`,
    hints: ["Global mutable state is error-prone.", "Pass the counter by pointer instead of using a global."],
    expectedOutput: "Counter: 2000",
    errorDescription: "Logic error: global state leads to unexpected behavior",
    points: 300,
    timeLimit: 300,
  },
  {
    id: "h4",
    title: "Double Free Corruption",
    description: "Fix the double free error in this program.",
    difficulty: "hard",
    buggyCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(sizeof(int));
    int *b = a;
    *a = 100;
    printf("Value: %d\\n", *b);
    free(a);
    free(b);
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *a = (int *)malloc(sizeof(int));
    int *b = a;
    *a = 100;
    printf("Value: %d\\n", *b);
    free(a);
    a = NULL;
    b = NULL;
    return 0;
}`,
    hints: ["Both pointers point to the same memory.", "Only free memory once; set pointers to NULL after freeing."],
    expectedOutput: "Value: 100",
    errorDescription: "free(): double free detected in tcache 2",
    points: 300,
    timeLimit: 300,
  },
  {
    id: "h5",
    title: "Struct Alignment Bug",
    description: "Fix the incorrect struct member access.",
    difficulty: "hard",
    buggyCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[20];
    int age;
    float gpa;
} Student;

int main() {
    Student s;
    s.name = "John";
    s.age = 20;
    s.gpa = 3.8;
    printf("Name: %s, Age: %d, GPA: %.1f\\n",
           s.name, s.age, s.gpa);
    return 0;
}`,
    correctCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[20];
    int age;
    float gpa;
} Student;

int main() {
    Student s;
    strcpy(s.name, "John");
    s.age = 20;
    s.gpa = 3.8;
    printf("Name: %s, Age: %d, GPA: %.1f\\n",
           s.name, s.age, s.gpa);
    return 0;
}`,
    hints: ["You cannot assign a string to a char array with =.", "Use strcpy() to copy strings into char arrays."],
    expectedOutput: "Name: John, Age: 20, GPA: 3.8",
    errorDescription: "error: assignment to expression with array type",
    points: 300,
    timeLimit: 300,
  },
];

export function getQuestionsByDifficulty(difficulty: "easy" | "medium" | "hard") {
  return questions.filter((q) => q.difficulty === difficulty);
}
