

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapterId: number;
}

export const questions: Question[] = [
  // Chapter 1 - OS Concepts
  {
    id: 1,
    question: "What is the primary goal of a general-purpose OS?",
    options: ["Efficiency", "Convenience (user-friendliness)", "Security", "Speed"],
    correctAnswer: 1,
    explanation: "The primary goal of a general-purpose OS is convenience (user-friendliness); efficiency is secondary. For network/server environments, this priority is reversed.",
    chapterId: 1
  },
  {
    id: 2,
    question: "What is the core component of the OS that controls communication between user and hardware?",
    options: ["Shell", "Kernel", "Compiler", "Device Driver"],
    correctAnswer: 1,
    explanation: "The Kernel is the core component of the OS that controls communication between user and hardware. Applications request hardware access through the kernel via system calls.",
    chapterId: 1
  },
  {
    id: 3,
    question: "Which of the following is NOT a function of a general-purpose OS?",
    options: ["Process Management", "Memory Management", "Web Browsing", "Security and Protection"],
    correctAnswer: 2,
    explanation: "The six main functions are: Process Management, Memory Management, Storage Management, I/O Device Management, Network Management, and Security and Protection. Web browsing is an application function.",
    chapterId: 1
  },
  {
    id: 4,
    question: "In the 4-tier view of a computer system, which tier is the highest?",
    options: ["Computer Hardware", "Operating System", "System & Application Programs", "Users"],
    correctAnswer: 3,
    explanation: "Tier 3 (Highest) is Users, who interact through application software and OS. Tier 0 is Hardware, Tier 1 is OS, Tier 2 is System & Application Programs.",
    chapterId: 1
  },
  // Chapter 2 - OS Structures
  {
    id: 5,
    question: "What is the CPU mode when running an application?",
    options: ["Kernel Mode", "Monitor Mode", "User Mode", "System Mode"],
    correctAnswer: 2,
    explanation: "When running an application, the CPU operates in User Mode. When hardware access is needed, a system call triggers transition to Kernel Mode.",
    chapterId: 2
  },
  {
    id: 6,
    question: "Which OS structure has all components housed in one single unit?",
    options: ["Microkernel", "Layered", "Monolithic", "Modular"],
    correctAnswer: 2,
    explanation: "Simple/Monolithic structure (like MS-DOS) has all OS components in one single unit. It's the fastest but prone to errors since user programs co-exist with OS files.",
    chapterId: 2
  },
  {
    id: 7,
    question: "Which system call is used for process control to create a new process?",
    options: ["send()", "fork()", "open()", "getpid()"],
    correctAnswer: 1,
    explanation: "fork() is a process control system call used to create a new process. Other examples include exit(), kill(), and nice().",
    chapterId: 2
  },
  {
    id: 8,
    question: "In a microkernel structure, where are services like file management and networking implemented?",
    options: ["Inside the kernel", "In the hardware", "As separate server processes in user space", "In device drivers"],
    correctAnswer: 2,
    explanation: "In a microkernel, only minimum functionality is in the kernel. Other services (file management, I/O, networking) are implemented as separate server processes in user space.",
    chapterId: 2
  },
  // Chapter 3 - Processes
  {
    id: 9,
    question: "What is a process?",
    options: ["A program stored on disk", "A program in execution", "A collection of threads", "An OS service"],
    correctAnswer: 1,
    explanation: "A program in execution is called a process. When a program runs, its instructions load onto RAM and that instance becomes the process. A program is passive; a process is active.",
    chapterId: 3
  },
  {
    id: 10,
    question: "What data structure does the OS maintain for every process?",
    options: ["Page Table", "Process Control Block (PCB)", "File Descriptor Table", "Stack"],
    correctAnswer: 1,
    explanation: "Every process has a PCB containing: Process ID, State, Pointer, Priority, Program Counter, CPU Registers, and I/O Information.",
    chapterId: 3
  },
  {
    id: 11,
    question: "After a process calls fork() 3 times, how many total processes exist (including the original)?",
    options: ["4", "6", "8", "9"],
    correctAnswer: 2,
    explanation: "Total processes = 2^n = 2^3 = 8. Child processes = 2^n - 1 = 7.",
    chapterId: 3
  },
  {
    id: 12,
    question: "Which IPC model is faster — Shared Memory or Message Passing?",
    options: ["Message Passing", "Shared Memory", "Both are equal", "Depends on the OS"],
    correctAnswer: 1,
    explanation: "Shared Memory Model is faster than Message Passing because processes directly access a shared memory region without kernel intervention for each data transfer.",
    chapterId: 3
  },
  {
    id: 13,
    question: "What is a socket defined as?",
    options: ["IP address only", "Port number only", "Concatenation of IP address and port number", "MAC address"],
    correctAnswer: 2,
    explanation: "A socket is defined as the concatenation of IP address and port number (e.g., 192.168.2.1:80).",
    chapterId: 3
  },
  // Chapter 4 - Threads
  {
    id: 14,
    question: "What does each thread have its own copy of?",
    options: ["Code, data, and files", "Program Counter, ID, Registers, and Stack", "Only Stack and Registers", "Only Program Counter"],
    correctAnswer: 1,
    explanation: "Each thread has its own: Program Counter, ID, set of Registers, and Stack. Threads share code, data, and files provided by the process.",
    chapterId: 4
  },
  {
    id: 15,
    question: "If one User Level Thread (ULT) blocks, what happens to the entire process?",
    options: ["Other threads continue", "The entire process blocks", "Only the blocked thread stops", "The kernel takes over"],
    correctAnswer: 1,
    explanation: "With ULTs, if one thread blocks, the entire process blocks because the kernel is unaware of individual ULTs within the process.",
    chapterId: 4
  },
  {
    id: 16,
    question: "Which multithreaded model maps many ULTs to a single KLT?",
    options: ["One-to-One", "Many-to-One", "Many-to-Many", "One-to-Many"],
    correctAnswer: 1,
    explanation: "Many-to-One maps many ULTs to a single KLT. No parallelism; only one ULT can access kernel at a time. Used by Solaris.",
    chapterId: 4
  },
  {
    id: 17,
    question: "Which type of thread cancellation is preferred and why?",
    options: ["Asynchronous — faster termination", "Deferred — allows clean resource reclamation", "Immediate — prevents data corruption", "Both are equally preferred"],
    correctAnswer: 1,
    explanation: "Deferred Cancellation is preferred because it allows the thread to check and self-terminate safely, enabling clean resource reclamation.",
    chapterId: 4
  },
  // Chapter 5 - Deadlocks
  {
    id: 18,
    question: "How many conditions must hold simultaneously for a deadlock to occur?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "All 4 conditions must hold: Mutual Exclusion, Hold and Wait, Non-Preemption, and Circular Wait.",
    chapterId: 5
  },
  {
    id: 19,
    question: "In a Resource Allocation Graph (RAG), what do circles represent?",
    options: ["Resources", "Processes", "Files", "Devices"],
    correctAnswer: 1,
    explanation: "In a RAG, processes are represented by circles, resources by squares. Assignment edges point from resource to process; request edges point from process to resource.",
    chapterId: 5
  },
  {
    id: 20,
    question: "Which deadlock handling method uses the Banker's Algorithm?",
    options: ["Prevention", "Avoidance", "Detection and Recovery", "Ignorance"],
    correctAnswer: 1,
    explanation: "Banker's Algorithm is a deadlock avoidance method. The system maintains complete resource information and uses it to make safe allocation decisions, ensuring the system stays in a safe state.",
    chapterId: 5
  },
  {
    id: 21,
    question: "The Ostrich Algorithm for deadlock handling involves:",
    options: ["Preventing deadlocks", "Avoiding deadlocks", "Detecting and recovering from deadlocks", "Ignoring deadlocks"],
    correctAnswer: 3,
    explanation: "The Ostrich Algorithm ignores deadlocks. It's used when the cost of prevention exceeds the impact of deadlocks (e.g., personal computers, UNIX).",
    chapterId: 5
  },
  // Chapter 6 - Memory Management
  {
    id: 22,
    question: "Which memory type is the fastest?",
    options: ["Secondary Storage", "Main Memory (RAM)", "Cache Memory", "Registers"],
    correctAnswer: 3,
    explanation: "Registers are the fastest (and smallest, most expensive) — inside the CPU. Then Cache → RAM → Secondary Storage.",
    chapterId: 6
  },
  {
    id: 23,
    question: "What is the formula for Physical Address in Contiguous Memory Allocation?",
    options: ["PA = Logical Address - Relocation Register", "PA = Logical Address + Relocation Register", "PA = Logical Address × Relocation Register", "PA = Logical Address / Relocation Register"],
    correctAnswer: 1,
    explanation: "Physical Address = Logical Address + Relocation Register. But first, LA must be ≤ Limit Register; otherwise the OS raises a trap error.",
    chapterId: 6
  },
  {
    id: 24,
    question: "Which allocation algorithm allocates to the smallest partition that fits?",
    options: ["First Fit", "Best Fit", "Worst Fit", "Next Fit"],
    correctAnswer: 1,
    explanation: "Best Fit allocates to the smallest partition that fits, minimizing internal fragmentation in fixed-sized partitioning.",
    chapterId: 6
  },
  {
    id: 25,
    question: "In paging, what is the relationship between pages and frames?",
    options: ["Pages are larger than frames", "Frames are larger than pages", "Pages and frames are equal in size", "There is no relationship"],
    correctAnswer: 2,
    explanation: "Pages (fixed-size partitions of secondary memory) and Frames (fixed-size partitions of main memory) are equal in size. The Page Table maps page numbers to frame addresses.",
    chapterId: 6
  },
  // Chapter 7 - File System
  {
    id: 26,
    question: "What does 'chmod 777' do in *nix systems?",
    options: ["Grants read-only access to all", "Grants all permissions (Read, Write, Execute) to all user types", "Removes all permissions", "Changes file ownership"],
    correctAnswer: 1,
    explanation: "chmod 777 grants all permissions to all user types. Read=4, Write=2, Execute=1; 7 = 4+2+1 (full privilege).",
    chapterId: 7
  },
  {
    id: 27,
    question: "Which directory structure allows file sharing between different directories?",
    options: ["Single Level", "Two Level", "Tree Structure", "Acyclic Graph"],
    correctAnswer: 3,
    explanation: "Acyclic Graph Directory extends the tree structure to allow file sharing between different directories while supporting all file system operations.",
    chapterId: 7
  },
  {
    id: 28,
    question: "What does the 'Truncate' file operation do?",
    options: ["Deletes the file completely", "Deletes file contents without changing attributes", "Changes file name", "Moves the file to another directory"],
    correctAnswer: 1,
    explanation: "Truncate deletes the contents of a file without changing its attributes (name, permissions, etc.).",
    chapterId: 7
  },
  // Chapter 8 - Cloud Computing
  {
    id: 29,
    question: "Which cloud deployment model combines public and private clouds?",
    options: ["Community Cloud", "Hybrid Cloud", "Public Cloud", "Private Cloud"],
    correctAnswer: 1,
    explanation: "Hybrid Cloud combines public and private clouds (and possibly on-premise servers). It offers flexibility, security, cost-effectiveness, and scalability.",
    chapterId: 8
  },
  {
    id: 30,
    question: "IaaS stands for?",
    options: ["Internet as a Service", "Infrastructure as a Service", "Integration as a Service", "Information as a Service"],
    correctAnswer: 1,
    explanation: "IaaS = Infrastructure as a Service. The CSP provides virtualized computing resources over the internet. IaaS = Host, PaaS = Build, SaaS = Consume.",
    chapterId: 8
  },
  {
    id: 31,
    question: "Which type of hypervisor runs directly on hardware?",
    options: ["Type I (Bare Metal)", "Type II (Hosted)", "Type III (Embedded)", "Type IV (Virtual)"],
    correctAnswer: 0,
    explanation: "Type I (Bare Metal) hypervisor runs directly on hardware, acting like an OS. Examples: Microsoft Hyper-V, VMware ESXi. Type II runs as an application on top of an OS.",
    chapterId: 8
  },
  {
    id: 32,
    question: "What is the main difference between containers and VMs?",
    options: ["Containers are slower", "Containers virtualize at the OS level, VMs at the hardware level", "VMs are more lightweight", "There is no difference"],
    correctAnswer: 1,
    explanation: "Containers virtualize at the OS level (not hardware level), sharing the OS kernel and using a fraction of the memory VMs require. They are far more lightweight than VMs.",
    chapterId: 8
  },
  // Chapter 9 - CPU Scheduling
  {
    id: 33,
    question: "Which scheduling algorithm can cause the Convoy Effect?",
    options: ["SJF", "Round Robin", "FCFS/FIFO", "Priority Scheduling"],
    correctAnswer: 2,
    explanation: "FCFS can cause the Convoy Effect — short processes waiting behind a long process. Example: P1(24ms), P2(3ms), P3(3ms) in order P1→P2→P3 gives avg wait 17ms.",
    chapterId: 9
  },
  {
    id: 34,
    question: "What is the average waiting time when P1(24ms), P2(3ms), P3(3ms) arrive in the order P2→P3→P1 using FCFS?",
    options: ["17ms", "10ms", "3ms", "24ms"],
    correctAnswer: 2,
    explanation: "P2 waits 0ms, P3 waits 3ms, P1 waits 6ms. Average = (0+3+6)/3 = 3ms. This is much better than the P1→P2→P3 order which gives 17ms average.",
    chapterId: 9
  },
  {
    id: 35,
    question: "Which scheduling algorithm is optimal for minimum average waiting time?",
    options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
    correctAnswer: 1,
    explanation: "SJF (Shortest-Job-First) is optimal — it gives the minimum average waiting time. The preemptive version is called SRTF (Shortest Remaining Time First).",
    chapterId: 9
  },
  {
    id: 36,
    question: "What is the maximum wait time for a process in Round Robin with n processes and time quantum q?",
    options: ["n × q", "(n-1) × q", "n + q", "q^n"],
    correctAnswer: 1,
    explanation: "In Round Robin, no process waits more than (n-1) × q time units. If q is too large it degrades to FCFS; if too small, context switch overhead dominates.",
    chapterId: 9
  },
  {
    id: 37,
    question: "What is the solution to starvation in Priority Scheduling?",
    options: ["Preemption", "Aging (gradually increase priority of long-waiting processes)", "Increasing time quantum", "Using FCFS instead"],
    correctAnswer: 1,
    explanation: "Starvation occurs when low-priority processes wait indefinitely. The solution is Aging — gradually increasing the priority of long-waiting processes.",
    chapterId: 9
  },
  {
    id: 38,
    question: "What three requirements must a solution to the Critical Section problem satisfy?",
    options: ["Speed, Efficiency, Scalability", "Mutual Exclusion, Progress, Bounded Waiting", "Atomicity, Consistency, Durability", "Security, Privacy, Availability"],
    correctAnswer: 1,
    explanation: "The three requirements are: Mutual Exclusion (only one process in critical section), Progress (no indefinite postponement), and Bounded Waiting (limit on how long a process waits to enter).",
    chapterId: 9
  },
  // Additional mixed questions
  {
    id: 39,
    question: "What is the approximate time for a context switch?",
    options: ["1-2 µs", "~10 µs", "100 µs", "10-100 ms"],
    correctAnswer: 1,
    explanation: "Context switch time is approximately 10 microseconds (µs). The CPU time slice for scheduling is 10-100 milliseconds (ms).",
    chapterId: 3
  },
  {
    id: 40,
    question: "In *nix systems, what value represents full privilege (Read, Write, Execute)?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "Full privilege = 7 (4+2+1). Read=4, Write=2, Execute=1. chmod 777 grants all permissions to all user types.",
    chapterId: 7
  },
  {
    id: 41,
    question: "What is the mode bit value for Kernel Mode?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 0,
    explanation: "Mode bit: 0 = Kernel/Monitor mode; 1 = User mode. When a system call is made, the mode switches from User (1) to Kernel (0).",
    chapterId: 2
  },
  {
    id: 42,
    question: "What happens if a process's Logical Address exceeds the Limit Register?",
    options: ["The address is accepted", "OS raises a trap error", "The address wraps around", "The process is terminated"],
    correctAnswer: 1,
    explanation: "If Logical Address > Limit Register, the OS raises a trap error. Otherwise, Physical Address = Logical Address + Relocation Register.",
    chapterId: 6
  },
  {
    id: 43,
    question: "Which of the following is NOT a benefit of threads over processes?",
    options: ["Responsiveness", "Resource Sharing", "Better security isolation", "Economy"],
    correctAnswer: 2,
    explanation: "Threads share resources (code, data, files) which makes communication easier but provides LESS isolation than processes. Benefits include Responsiveness, Resource Sharing, Economy, and Scalability.",
    chapterId: 4
  },
  {
    id: 44,
    question: "What is the time quantum typically used in Round Robin scheduling?",
    options: ["1-5 µs", "10-100 ms", "1-5 seconds", "10-100 seconds"],
    correctAnswer: 1,
    explanation: "Round Robin typically uses a time quantum of 10-100 ms. Each process gets this fixed time slice, after which it is preempted and added to the end of the ready queue.",
    chapterId: 9
  },
  {
    id: 45,
    question: "In the Producer-Consumer problem, what happens when the bounded buffer is full?",
    options: ["Consumer waits", "Producer waits", "Both wait", "Data is lost"],
    correctAnswer: 1,
    explanation: "In the bounded buffer version, the producer waits when the buffer is full, and the consumer waits when the buffer is empty.",
    chapterId: 3
  },
  {
    id: 46,
    question: "What is the formula to calculate Need in the Banker's Algorithm?",
    options: ["Need = Allocation - Maximum Need", "Need = Maximum Need - Allocation", "Need = Maximum Need + Allocation", "Need = Available - Allocation"],
    correctAnswer: 1,
    explanation: "Need = Maximum Need - Allocation. A process is executed only if its resource need ≤ available resources.",
    chapterId: 5
  },
  {
    id: 47,
    question: "Which type of cloud service model provides an environment to build and manage applications without managing infrastructure?",
    options: ["IaaS", "PaaS", "SaaS", "DaaS"],
    correctAnswer: 1,
    explanation: "PaaS (Platform as a Service) provides an environment to build, run, and manage applications without managing IT infrastructure. Developers focus on coding; CSP handles provisioning.",
    chapterId: 8
  },
  {
    id: 48,
    question: "What is the difference between a signal and an interrupt?",
    options: ["They are the same thing", "Signals are software events; interrupts are external hardware events", "Signals are hardware events; interrupts are software events", "Interrupts are triggered by CPU; signals by I/O"],
    correctAnswer: 1,
    explanation: "Signals are software events triggered by the CPU; interrupts are external hardware events. Thread pools receive signals and dispatch accordingly.",
    chapterId: 4
  },
  {
    id: 49,
    question: "What does the dispatcher do?",
    options: ["Admits new processes to ready queue", "Provides mechanism for running processes (context switch, mode switch)", "Terminates processes", "Creates processes"],
    correctAnswer: 1,
    explanation: "The dispatcher provides the basic mechanism for running processes: context switch, switch to user mode, and jump to the correct program location.",
    chapterId: 9
  },
  {
    id: 50,
    question: "Which OS structure does Linux/Solaris use?",
    options: ["Pure Microkernel", "Pure Monolithic", "Monolithic + Modules", "Layered only"],
    correctAnswer: 2,
    explanation: "Linux/Solaris uses a Hybrid structure: Monolithic + Modules. Windows uses Monolithic + Microkernel. MAC uses Microkernel + Layered.",
    chapterId: 2
  },
  {
    id: 51,
    question: "What is the average access time formula for memory hierarchy?",
    options: ["(hit_ratio × T_RAM) + ((1-hit_ratio) × (T_RAM + T_Disk))", "hit_ratio × (T_RAM + T_Disk)", "(1-hit_ratio) × T_RAM + hit_ratio × T_Disk", "T_RAM + (1-hit_ratio) × T_Disk"],
    correctAnswer: 0,
    explanation: "Average Access Time = (hit_ratio × T_RAM) + ((1-hit_ratio) × (T_RAM + T_Disk)). This accounts for cache hits and misses.",
    chapterId: 6
  },
  {
    id: 52,
    question: "Which deadlock condition is violated when processes must acquire all resources before starting?",
    options: ["Mutual Exclusion", "Hold and Wait", "Non-Preemption", "Circular Wait"],
    correctAnswer: 1,
    explanation: "Violating Hold and Wait: the conservative approach requires a process to acquire all required resources before starting execution, so it never holds some while waiting for others.",
    chapterId: 5
  },
  {
    id: 53,
    question: "What is the key advantage of Variable Sized Partitioning over Fixed Sized Partitioning?",
    options: ["Eliminates external fragmentation", "Eliminates internal fragmentation", "Faster access", "Lower overhead"],
    correctAnswer: 1,
    explanation: "Variable Sized Partitioning eliminates internal fragmentation because processes occupy exactly the space needed. However, external fragmentation can still occur.",
    chapterId: 6
  },
  {
    id: 54,
    question: "What does fork() return to the child process?",
    options: ["Parent PID", "0", "Child PID", "-1"],
    correctAnswer: 1,
    explanation: "fork() creates a child process. The child process receives 0 as the return value, while the parent receives the child's PID. Both continue execution from the fork() call.",
    chapterId: 3
  },
  {
    id: 55,
    question: "Which iOS layer handles touch input and provides the API?",
    options: ["Core OS", "Core Services", "Media", "Cocoa Touch"],
    correctAnswer: 3,
    explanation: "iOS has 4 layers: Cocoa Touch (API, touch input), Media (graphics, audio/video), Core Services (iCloud connectivity), and Core OS (process/memory/network management).",
    chapterId: 2
  },
];
