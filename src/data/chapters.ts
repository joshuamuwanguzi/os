export interface Section {
  title: string;
  content: string;
  bullets?: string[];
}

export interface Term {
  term: string;
  definition: string;
}

export interface Chapter {
  id: number;
  title: string;
  sections: Section[];
  terms: Term[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Operating System Concepts",
    sections: [
      {
        title: "Definition of Operating Systems",
        content: "Software is classified into System Software (manages systems) and Application Software (user interaction). The OS is system software that acts as an intermediary between hardware and user, manages system resources unbiasedly, and provides a platform for application programs.",
        bullets: [
          "Without OS, users communicate with hardware in machine language",
          "OS acts like a car's dashboard AC button — convenient interface to hardware",
          "4 Tiers: Hardware → OS → System/App Programs → Users"
        ]
      },
      {
        title: "Computer System Organization",
        content: "Key terminology for understanding computer systems.",
        bullets: [
          "Kernel: Core OS component controlling communication between user and hardware",
          "System Call: Request by application software to kernel for hardware access",
          "Bit: Smallest unit a computer can process",
          "Byte: 8 bits = 1 Byte",
          "Word: Number of bits a CPU processes simultaneously",
          "Register: Smallest storage device, storing data in bits"
        ]
      },
      {
        title: "Goals vs Functions",
        content: "Primary goal of general-purpose OS is convenience (user-friendliness); efficiency is secondary. For network/server environments, priority is reversed.",
        bullets: [
          "Six main functions: Process Management, Memory Management, Storage Management, I/O Device Management, Network Management, Security and Protection",
          "Process: program in execution requiring CPU, RAM, and I/O",
          "Single-threaded: one Program Counter; Multithreaded: one PC per thread"
        ]
      },
      {
        title: "Computing Environments",
        content: "Different environments use different OS configurations.",
        bullets: [
          "Traditional: Windows, MAC, Linux",
          "Mobile: iOS, Android",
          "Network: Distributed, Client-Server, Peer-to-Peer",
          "Virtualization: VirtualBox, VMware",
          "Real-Time Embedded: Windows 10 IoT, RTOS",
          "Cloud Computing: AWS, Azure, GCP"
        ]
      }
    ],
    terms: [
      { term: "Operating System", definition: "System software that acts as an intermediary between hardware and user, manages system resources, and provides a platform for application programs." },
      { term: "Kernel", definition: "Core component of the OS that controls communication between user and hardware." },
      { term: "System Call", definition: "A request made by application software to the kernel to access hardware resources." },
      { term: "Bit", definition: "The smallest unit a computer can process." },
      { term: "Byte", definition: "8 bits." },
      { term: "Word", definition: "The number of bits a CPU processes simultaneously." },
      { term: "Register", definition: "The smallest storage device, storing data in bits." },
      { term: "Process Management", definition: "OS function that creates, executes, terminates, and aborts processes." },
      { term: "Memory Management", definition: "OS function that allocates/de-allocates memory, assigns priorities, and tracks memory utilization." }
    ]
  },
  {
    id: 2,
    title: "Operating System Structures",
    sections: [
      {
        title: "OS Services",
        content: "Operating systems provide essential services to users and programs.",
        bullets: [
          "User Interface: CLI (keyboard), Batch Interface (script files), GUI (pointer/keyboard)",
          "Program Execution: OS loads program instructions into memory",
          "I/O Operations: OS provides mechanisms to control I/O devices",
          "File Systems: Programs read/write files and manage directories",
          "Communications: Protocols for inter-process and network communication",
          "Error Detection: Detects errors in CPU, memory, and I/O devices"
        ]
      },
      {
        title: "User Mode vs Kernel Mode",
        content: "When running an application, the CPU operates in User Mode. When a user program needs hardware access, it makes a system call and transitions to Kernel Mode. After completion, control returns to User Mode.",
        bullets: [
          "Example: Saving an Excel file triggers a system call to write data to disk via kernel",
          "Mode bit: 0 = Kernel/Monitor; 1 = User"
        ]
      },
      {
        title: "System Call Types",
        content: "System calls are written in high-level languages (C, C++). Windows 10 has over 2,000 system calls.",
        bullets: [
          "Process Control: fork(), exit(), kill(), nice()",
          "File Management: create(), open(), write(), mkdir()",
          "I/O Device Management: Device-specific calls",
          "Information Maintenance: getpid(), set_timer()",
          "Communication: send(), receive()",
          "Protection: set_permission(), allow_user()"
        ]
      },
      {
        title: "OS Structures",
        content: "Different architectural approaches to building an OS.",
        bullets: [
          "Simple/Monolithic (MS-DOS): All components in one unit. Fastest but error-prone",
          "Layered (MULTICS): Divided into layers with well-defined functionality. Easy to update",
          "Microkernel: Minimum functionality in kernel (scheduling, IPC, memory). Other services in user space",
          "Modules: Loadable kernel modules that can communicate directly. Used by Linux, Solaris",
          "Hybrid: Linux = Monolithic+Modules; Windows = Monolithic+Microkernel; MAC = Microkernel+Layered"
        ]
      },
      {
        title: "Modern OS Structures",
        content: "Modern operating systems use hybrid approaches.",
        bullets: [
          "MAC OS: User space has AQUA GUI + Cocoa API. Kernel has MACH (memory, IPC) + BSD (CLI, networking)",
          "iOS: 4 layers — Cocoa Touch, Media, Core Services, Core OS",
          "Android: Layered stack with customized Linux kernel"
        ]
      }
    ],
    terms: [
      { term: "CLI", definition: "Command Line Interface — uses keyboard commands to interact with OS." },
      { term: "GUI", definition: "Graphical User Interface — pointer/keyboard interaction with OS." },
      { term: "User Mode", definition: "CPU mode when running applications; restricted access to hardware." },
      { term: "Kernel Mode", definition: "CPU mode with full hardware access; entered via system calls." },
      { term: "Monolithic Structure", definition: "All OS components in one single unit. Fast but error-prone." },
      { term: "Layered Structure", definition: "OS divided into layers with communication only between adjacent layers." },
      { term: "Microkernel", definition: "Minimal kernel functionality; other services run in user space as separate processes." },
      { term: "System Programs", definition: "Utility programs that provide an interface for users to create system calls." }
    ]
  },
  {
    id: 3,
    title: "Processes",
    sections: [
      {
        title: "Process Definition",
        content: "A program in execution is called a process. A program is a passive entity; a process is an active entity.",
        bullets: [
          "Four components: Stack (temp data), Heap (dynamic allocation), Data (global/static vars), Text (program counter + registers)",
          "PCB (Process Control Block): Contains PID, State, Pointer, Priority, Program Counter, CPU Registers, I/O Info"
        ]
      },
      {
        title: "Process States (5 States)",
        content: "The life cycle of a process through different states.",
        bullets: [
          "New → Process is being created",
          "Ready → Waiting in ready queue for CPU assignment",
          "Running → Instructions being executed by CPU",
          "Waiting → Waiting for I/O event to occur",
          "Terminated → Execution completed"
        ]
      },
      {
        title: "Process Scheduling",
        content: "CPU executes one process at a time, allocating equal time slices.",
        bullets: [
          "High-Level Scheduler (HLS): Admits new processes into ready queue",
          "Low-Level Scheduler (LLS): Moves processes from ready queue to CPU (10-100ms per process)",
          "Context Switching: Saving/restoring process state (~10 µs)"
        ]
      },
      {
        title: "Process Operations",
        content: "Process creation and termination mechanics.",
        bullets: [
          "fork(): Creates child process (clone with own PID and PCB)",
          "Number of total processes after n fork() calls = 2^n",
          "Number of child processes = 2^n - 1",
          "exit(): Process terminates after last statement",
          "abort(): Parent terminates child"
        ]
      },
      {
        title: "Inter-Process Communication (IPC)",
        content: "IPC allows processes to communicate and synchronize.",
        bullets: [
          "Shared Memory Model: Specific memory region shared between processes (faster)",
          "Producer-Consumer: Unbounded Buffer vs Bounded Buffer",
          "Message Passing Model: Processes exchange messages (easier, better for distributed)",
          "Naming: Direct or Indirect (Mailbox), Synchronization: Blocking/Non-Blocking",
          "Buffering: Zero, Bounded, or Unbounded capacity queues"
        ]
      },
      {
        title: "IPC Methods",
        content: "Specific implementations of inter-process communication.",
        bullets: [
          "Sockets: Endpoint of communication — IP address + port number (e.g., 192.168.2.1:80)",
          "RPC: Client-server model with 5 components: Client, Client Stub, RPC Runtime, Server Stub, Server",
          "Pipelining: Divides execution into stages for simultaneous progress",
          "Ordinary Pipes (parent-child) vs Named Pipes (any process)"
        ]
      }
    ],
    terms: [
      { term: "Process", definition: "A program in execution — an active entity with stack, heap, data, and text segments." },
      { term: "PCB (Process Control Block)", definition: "Data structure maintained by OS containing PID, State, Priority, Program Counter, CPU Registers, and I/O Info." },
      { term: "Context Switching", definition: "Saving and restoring process state when CPU switches processes. Takes ~10 µs." },
      { term: "fork()", definition: "System call that creates a child process (clone with own PID and PCB)." },
      { term: "High-Level Scheduler (HLS)", definition: "Long-term scheduler that admits new processes into the ready queue." },
      { term: "Low-Level Scheduler (LLS)", definition: "Short-term scheduler that moves processes from ready queue to CPU." },
      { term: "IPC (Inter-Process Communication)", definition: "Mechanisms that allow processes to communicate and synchronize." },
      { term: "Shared Memory Model", definition: "IPC model where a specific memory region is shared between processes. Faster than message passing." },
      { term: "Message Passing Model", definition: "IPC model where processes communicate by exchanging messages. Better for distributed environments." },
      { term: "Socket", definition: "Endpoint of communication defined as IP address + port number (e.g., 192.168.2.1:80)." }
    ]
  },
  {
    id: 4,
    title: "Threads",
    sections: [
      {
        title: "Thread Overview",
        content: "A thread is a lightweight process — the basic unit of CPU execution — responsible for one specific task. Preferred over parent-child processes because it's faster and consumes fewer resources.",
        bullets: [
          "Each thread has its own: Program Counter, ID, set of Registers, and Stack",
          "Threads share: code, data, and files provided by the process",
          "Benefits: Responsiveness, Resource Sharing, Economy, Scalability"
        ]
      },
      {
        title: "Multicore Programming",
        content: "Two execution approaches in multicore systems.",
        bullets: [
          "Concurrency: Multiple tasks apparently simultaneously (one at a time)",
          "Parallelism: Multiple tasks truly simultaneously across multiple resources",
          "Single-core: one CU and one ALU; Multicore: multiple CUs and ALUs on one chip"
        ]
      },
      {
        title: "User Level vs Kernel Level Threads",
        content: "Two types of threads with different characteristics.",
        bullets: [
          "ULT: Thread library in user space. Simple creation, extremely fast, no kernel privilege needed",
          "KLT: Managed by Kernel. Requires system call, slower, supports true parallelism",
          "ULT blocking: Entire process blocks if one ULT blocks",
          "KLT blocking: Other threads continue if one blocks",
          "ULT: No true parallelism; KLT: Supports true parallel execution"
        ]
      },
      {
        title: "Multi-Threaded Models",
        content: "Mappings between User Level Threads and Kernel Level Threads.",
        bullets: [
          "Many-to-One: Many ULTs → one KLT. No parallelism. Used by Solaris",
          "One-to-One: One ULT → one KLT. Blocking one doesn't block others. Used by Windows",
          "Many-to-Many: Many ULTs → equal/fewer KLTs. Supports parallelism"
        ]
      },
      {
        title: "Threading Issues",
        content: "Common issues in multithreaded programming.",
        bullets: [
          "fork() in multithreaded process: may duplicate all threads or only calling thread",
          "exec() replaces the entire process (all threads)",
          "Signals: software events triggered by CPU; Interrupts: external hardware events",
          "Thread Cancellation: Asynchronous (immediate) vs Deferred (check and self-terminate)",
          "Thread Local Storage: Each thread maintains its own copy of global variables to avoid deadlocks"
        ]
      }
    ],
    terms: [
      { term: "Thread", definition: "A lightweight process — the basic unit of CPU execution. Has own PC, ID, registers, and stack; shares code, data, and files." },
      { term: "Concurrency", definition: "Multiple tasks apparently simultaneously, one at a time (single-core illusion of parallelism)." },
      { term: "Parallelism", definition: "Multiple tasks truly simultaneously across multiple resources (multicore)." },
      { term: "User Level Thread (ULT)", definition: "Thread managed by thread library in user address space. Fast creation, no kernel privilege needed. Entire process blocks if one ULT blocks." },
      { term: "Kernel Level Thread (KLT)", definition: "Thread managed by kernel. Requires system call, full TCB per thread, supports true parallel execution." },
      { term: "Many-to-One Model", definition: "Many ULTs mapped to a single KLT. No parallelism. Used by Solaris." },
      { term: "One-to-One Model", definition: "One ULT maps to one KLT. If one blocks, others continue. Used by Windows." },
      { term: "Many-to-Many Model", definition: "Many ULTs mapped to equal or fewer KLTs. Supports parallelism." },
      { term: "Thread Local Storage", definition: "Each thread maintains its own copy of global variables to avoid deadlocks when multiple threads write to a shared variable." }
    ]
  },
  {
    id: 5,
    title: "Deadlocks",
    sections: [
      {
        title: "What is a Deadlock?",
        content: "A deadlock occurs when a process cannot change its waiting state indefinitely because resources it needs are held by another waiting process.",
        bullets: [
          "Resource Allocation Graph (RAG): Processes = circles, Resources = squares",
          "Assignment edge: resource → process; Request edge: process → resource",
          "A cycle in RAG with single-instance resources guarantees deadlock"
        ]
      },
      {
        title: "4 Deadlock Conditions (ALL Must Hold)",
        content: "For a deadlock to occur, all four conditions must be present simultaneously.",
        bullets: [
          "1. Mutual Exclusion: At least one resource must be non-shareable",
          "2. Hold and Wait: Process holds at least one resource and waits for more",
          "3. Non-Preemption: Resources cannot be forcibly taken; only voluntary release",
          "4. Circular Wait: Each process waits for a resource held by the next in a cycle"
        ]
      },
      {
        title: "Deadlock Handling Methods",
        content: "Four approaches to dealing with deadlocks.",
        bullets: [
          "Prevention: Design system to violate at least one of the four conditions (expensive, used in real-time systems)",
          "Avoidance: Banker's Algorithm — maintain resource info and make safe allocation decisions",
          "Detection and Recovery: Allow deadlocks, detect them, recover by terminating or preempting",
          "Ignorance (Ostrich Algorithm): Ignore deadlocks (cost of prevention > impact). Used in UNIX, PCs"
        ]
      },
      {
        title: "Prevention Strategies",
        content: "How to prevent deadlocks by violating each condition.",
        bullets: [
          "Violate Mutual Exclusion: Make all resources shareable — practically infeasible",
          "Violate Hold and Wait: Acquire all resources before starting, or use timeouts",
          "Violate Non-Preemption: Allow high-priority to preempt from lower-priority waiting processes",
          "Violate Circular Wait: Assign numbers to resources; acquire in increasing/decreasing order"
        ]
      },
      {
        title: "Banker's Algorithm",
        content: "Deadlock avoidance algorithm requiring advance knowledge of each process's maximum resource needs.",
        bullets: [
          "OS maintains: Allocation (currently allocated), Maximum Need (max requirement), Available (Max - Allocation)",
          "Process executes only if its resource need ≤ available resources",
          "Safe state: exists a safe sequence to complete all processes without deadlock",
          "Limitation: Processes cannot always define static needs in advance"
        ]
      }
    ],
    terms: [
      { term: "Deadlock", definition: "A state where a process cannot change its waiting state indefinitely because resources it needs are held by another waiting process." },
      { term: "Resource Allocation Graph (RAG)", definition: "Visualization of deadlocks. Processes = circles, Resources = squares. Assignment edges (R→P) and request edges (P→R)." },
      { term: "Mutual Exclusion", definition: "Deadlock condition: at least one resource must be non-shareable (accessed by only one process at a time)." },
      { term: "Hold and Wait", definition: "Deadlock condition: a process holds at least one resource and is waiting to acquire additional resources held by others." },
      { term: "Non-Preemption", definition: "Deadlock condition: resources cannot be forcibly taken; they can only be released voluntarily." },
      { term: "Circular Wait", definition: "Deadlock condition: each process in a set waits for a resource held by the next process in a cycle." },
      { term: "Banker's Algorithm", definition: "Deadlock avoidance algorithm using Allocation, Maximum Need, and Available resources to ensure safe states." },
      { term: "Ostrich Algorithm", definition: "Deadlock handling method that ignores deadlocks. Used when prevention cost exceeds deadlock impact." },
      { term: "Safe State", definition: "A state from which a safe sequence exists to complete all processes without deadlock." }
    ]
  },
  {
    id: 6,
    title: "Memory Management",
    sections: [
      {
        title: "Memory Hierarchy",
        content: "Three competing criteria: Size (larger better), Access Time (shorter better), Per Unit Cost (lower better). These contradict, so memory is hierarchical.",
        bullets: [
          "Registers (fastest, smallest, most expensive) → inside CPU",
          "Cache Memory → on CPU; stores frequently accessed instructions",
          "Main Memory (RAM) → primary, volatile, directly accessible by CPU",
          "Secondary Storage → disks, non-volatile, large, slower",
          "Locality of Reference: CPU pre-fetches upcoming instructions into cache/RAM",
          "Avg Access Time = (hit_ratio × T_RAM) + ((1-hit_ratio) × (T_RAM + T_Disk))"
        ]
      },
      {
        title: "Memory Allocation Policies",
        content: "Two main approaches to allocating memory to processes.",
        bullets: [
          "CMA (Contiguous): All instructions placed together. Faster but causes external fragmentation",
          "N-CMA (Non-Contiguous): Instructions broken into chunks at different locations. No external fragmentation but slower"
        ]
      },
      {
        title: "Contiguous Allocation Types",
        content: "Two types of contiguous memory allocation.",
        bullets: [
          "Fixed Sized Partitioning: Fixed partitions. Causes both external AND internal fragmentation",
          "Variable Sized Partitioning: No predefined partitions. Eliminates internal fragmentation; external still possible"
        ]
      },
      {
        title: "CMA Allocation Algorithms",
        content: "Three algorithms for allocating memory in contiguous systems.",
        bullets: [
          "First Fit: First partition that fits → Best for Speed",
          "Best Fit: Smallest partition that fits → Minimum internal fragmentation",
          "Worst Fit: Largest partition that fits → Leaves larger remaining chunks"
        ]
      },
      {
        title: "Address Translation (CMA)",
        content: "How logical addresses are translated to physical addresses.",
        bullets: [
          "Limit Register: holds max number of instructions for the process",
          "If LA ≤ Limit Register → request valid",
          "Relocation Register: base address of process in main memory",
          "Physical Address = Logical Address + Relocation Register",
          "If LA > Limit Register → OS raises trap error"
        ]
      },
      {
        title: "Paging (Non-Contiguous)",
        content: "Implementation of non-contiguous memory allocation without external fragmentation.",
        bullets: [
          "Pages: Fixed-size partitions of secondary memory",
          "Frames: Fixed-size partitions of main memory (equal size to pages)",
          "Page Table (PT): Maps page numbers to frame base addresses (one PT per process)",
          "Logical Address = Page Number (P) + Offset (D)",
          "Fast access, no external fragmentation, but overhead of PT per process"
        ]
      }
    ],
    terms: [
      { term: "Locality of Reference", definition: "CPU pre-fetches upcoming instructions into cache/RAM to reduce access time." },
      { term: "CMA (Contiguous Memory Allocation)", definition: "All instructions of a process placed together. Faster but causes external fragmentation." },
      { term: "N-CMA (Non-Contiguous Memory Allocation)", definition: "Process instructions broken into chunks placed at different locations. No external fragmentation but slower." },
      { term: "Internal Fragmentation", definition: "Wasted space within a partition allocated to a smaller process than the partition size." },
      { term: "External Fragmentation", definition: "Free space exists but not in contiguous chunks large enough to fit a process." },
      { term: "First Fit", definition: "CMA algorithm: allocate to the first partition that fits. Best for speed." },
      { term: "Best Fit", definition: "CMA algorithm: allocate to the smallest partition that fits. Minimizes internal fragmentation." },
      { term: "Worst Fit", definition: "CMA algorithm: allocate to the largest partition that fits. Leaves larger remaining chunks." },
      { term: "Physical Address (CMA)", definition: "PA = Logical Address + Relocation Register. Must satisfy LA ≤ Limit Register." },
      { term: "Paging", definition: "N-CMA technique using fixed-size pages (secondary memory) mapped to frames (main memory) via a Page Table." },
      { term: "Page Table", definition: "Data structure (one per process) mapping page numbers to frame base addresses in main memory." }
    ]
  },
  {
    id: 7,
    title: "File System Interface",
    sections: [
      {
        title: "File Concept",
        content: "A file is a named collection of related information on secondary storage — a collection of bits, bytes, and characters.",
        bullets: [
          "Three types: Text Files, Source Files, Object Files",
          "File Attributes: Name, Identifier, Type, Location, Size, Protection, Time/Date, User ID",
          "File Operations: Create, Write, Read, Reposition (seek), Delete, Truncate"
        ]
      },
      {
        title: "File Access Methods",
        content: "Three ways to access data in files.",
        bullets: [
          "Sequential Access: Records processed in order — Read Next, Write Next, Rewind, Skip",
          "Direct Access (Disk Model): Jump to any record — Read 'n', Write 'n', Jump 'n'",
          "Indexed Access: Files organized using indexed tables with pointers to data"
        ]
      },
      {
        title: "Directory Structure",
        content: "Four models for organizing files in directories.",
        bullets: [
          "Single Level: One directory for all users. Simple but naming conflicts",
          "Two Level: Separate directory per user. Improved searching but naming problems persist",
          "Tree Structure: User-defined multiple sub-levels. Resolves naming problems",
          "Acyclic Graph: Extends tree to allow file sharing between directories"
        ]
      },
      {
        title: "File System Mounting and Sharing",
        content: "How file systems are mounted and how file permissions work.",
        bullets: [
          "Mounting: Attaches files to a specific file system path",
          "Unmounting: Detaches on uninstallation",
          "*nix user types: Administrators, Groups, Others/Public",
          "*nix access rights: Read (R=4), Write (W=2), Execute (X=1)",
          "Full privilege = 7 (4+2+1)",
          "Commands: ls -l (view permissions), chmod 777 (grant all permissions)"
        ]
      }
    ],
    terms: [
      { term: "File", definition: "A named collection of related information on secondary storage — bits, bytes, and characters." },
      { term: "Sequential Access", definition: "File access method where records are processed in order: Read Next, Write Next, Rewind, Skip." },
      { term: "Direct Access", definition: "File access method where you can jump to any record: Read 'n', Write 'n', Jump 'n'." },
      { term: "Indexed Access", definition: "File access method using indexed tables with pointers linking to data in relative files." },
      { term: "Mounting", definition: "Attaching files to a specific file system path, making OS files available at a specified location." },
      { term: "chmod 777", definition: "Command to grant all permissions (Read=4, Write=2, Execute=1) to all user types." },
      { term: "Acyclic Graph Directory", definition: "Directory structure that extends tree structure to allow file sharing between different directories." }
    ]
  },
  {
    id: 8,
    title: "Cloud Computing Concepts",
    sections: [
      {
        title: "Cloud Computing Introduction",
        content: "The cloud refers to servers accessed over the internet along with the software and applications running on them. Cloud servers are located in undisclosed data centers worldwide.",
        bullets: [
          "Users access same files/applications from any networked device",
          "Processing occurs on remote servers rather than local devices",
          "Lowers IT costs and enables international operations"
        ]
      },
      {
        title: "Cloud Deployment Models",
        content: "Four deployment models for cloud infrastructure.",
        bullets: [
          "Private Cloud: Dedicated to one organization. Highly secure but limited scalability and expensive",
          "Public Cloud: Shared among multiple organizations (multi-tenancy). Flexible, scalable, low cost but less secure",
          "Hybrid Cloud: Combines public and private. Flexible, secure, cost-effective but complex networking",
          "Community Cloud: Shared among organizations with common concerns. Cost reduction, enhanced security"
        ]
      },
      {
        title: "Cloud Service Models",
        content: "Three service models: IaaS, PaaS, SaaS.",
        bullets: [
          "IaaS: Virtualized computing resources over internet. Rent instead of purchase. Examples: AWS EC2, DigitalOcean",
          "PaaS: Environment to build, run, manage applications without managing infrastructure. Examples: Heroku, Azure App",
          "SaaS: Software licensed on subscription, hosted centrally. Examples: Salesforce, Gmail, Slack",
          "Summary: IaaS = Host | PaaS = Build | SaaS = Consume"
        ]
      },
      {
        title: "Virtualization",
        content: "Creates virtual versions of computing resources. Runs multiple OSs simultaneously on one machine.",
        bullets: [
          "Type I (Bare Metal): Runs directly on hardware (Hyper-V, VMware ESXi)",
          "Type II (Hosted): Runs as application on top of OS (VMware Workstation, VirtualBox)",
          "Benefits: Lower IT costs, max capital expenditure, increased efficiency, reduced downtime",
          "Virtualization is the foundation that enabled cloud computing"
        ]
      },
      {
        title: "Containers",
        content: "Package software with all necessary elements to run in any environment. Virtualize at OS level (not hardware).",
        bullets: [
          "More lightweight than VMs — share OS kernel, use fraction of memory",
          "Benefits: Separation of responsibility, workload portability, application isolation",
          "Analogy: container ship (VM) carrying many independent containers"
        ]
      }
    ],
    terms: [
      { term: "Cloud Computing", definition: "Network of internet-hosted servers used for storage, processing, and execution." },
      { term: "Private Cloud", definition: "Servers dedicated to one organization. Highly secure but limited scalability and expensive." },
      { term: "Public Cloud", definition: "Servers shared among multiple organizations via third-party CSP. Flexible, scalable, low cost." },
      { term: "Hybrid Cloud", definition: "Combines public and private clouds. Flexible, secure, cost-effective, scalable." },
      { term: "IaaS", definition: "Infrastructure as a Service — CSP provides virtualized computing resources. You manage. (Host)" },
      { term: "PaaS", definition: "Platform as a Service — environment to build/run/manage applications. CSP manages infrastructure. (Build)" },
      { term: "SaaS", definition: "Software as a Service — software licensed on subscription, hosted centrally. CSP manages everything. (Consume)" },
      { term: "Hypervisor", definition: "Manages virtualization. Type I (Bare Metal) runs on hardware; Type II (Hosted) runs on OS." },
      { term: "Container", definition: "Packages software with all elements to run in any environment. Virtualizes at OS level, more lightweight than VMs." }
    ]
  },
  {
    id: 9,
    title: "CPU Scheduling",
    sections: [
      {
        title: "Scheduling Overview",
        content: "CPU scheduling decides which process gets the CPU and for how long.",
        bullets: [
          "Preemptible resources: CPU, I/O channel (can be taken back)",
          "Non-Preemptible resources: file space, terminal (released only voluntarily)",
          "Scheduling decisions when: running→waiting, running→ready, waiting→ready, terminates",
          "Cases 1,4: non-preemptive; Cases 2,3: preemptive"
        ]
      },
      {
        title: "Types of Schedulers",
        content: "Three scheduler components.",
        bullets: [
          "Long-Term Scheduler (HLS): Selects processes brought into ready queue from job pool",
          "Short-Term Scheduler (LLS): Selects from ready processes and allocates CPU",
          "Dispatcher: Provides mechanism for running processes (context switch, mode switch)"
        ]
      },
      {
        title: "Scheduling Criteria",
        content: "Metrics used to evaluate scheduling algorithms.",
        bullets: [
          "CPU Utilization: Keep CPU as busy as possible",
          "Throughput: Number of processes completing per unit time",
          "Turnaround Time: Total time from submission to completion",
          "Waiting Time: Time spent in ready queue",
          "Response Time: Time from request to first response (time-sharing)"
        ]
      },
      {
        title: "Scheduling Algorithms",
        content: "Four primary scheduling algorithms.",
        bullets: [
          "FCFS/FIFO: First come, first served. Simple but Convoy Effect possible",
          "SJF: Shortest job first. Optimal — minimum avg waiting time. Preemptive version = SRTF",
          "Round Robin: Fixed time quantum (10-100ms). Max wait = (n-1)×q. Large q → FCFS; small q → overhead",
          "Priority Scheduling: Highest priority first. Starvation risk. Solution: Aging"
        ]
      },
      {
        title: "Cooperating Process Issues",
        content: "Key issues when processes cooperate.",
        bullets: [
          "Race Condition: Multiple processes access shared data; final value depends on last to finish",
          "Critical Section: Code that cannot execute concurrently with itself. Requirements: Mutual Exclusion, Progress, Bounded Waiting",
          "Producer-Consumer Problem: Producer waits when buffer full; Consumer waits when empty"
        ]
      }
    ],
    terms: [
      { term: "Preemptible Resource", definition: "Resource that can be taken back from a process (CPU, I/O channel)." },
      { term: "Non-Preemptible Resource", definition: "Resource released only voluntarily (file space, terminal)." },
      { term: "Dispatcher", definition: "Provides mechanism for running processes: context switch, switch to user mode, jump to correct location." },
      { term: "CPU Utilization", definition: "Scheduling criterion: keep the CPU as busy as possible." },
      { term: "Throughput", definition: "Number of processes completing execution per unit time." },
      { term: "Turnaround Time", definition: "Total time to execute a process (from submission to completion)." },
      { term: "Waiting Time", definition: "Time a process spends in the ready queue." },
      { term: "FCFS/FIFO", definition: "First-Come First-Served scheduling. Simple but can cause Convoy Effect." },
      { term: "SJF", definition: "Shortest-Job-First scheduling. Optimal for minimum average waiting time." },
      { term: "Round Robin (RR)", definition: "Each process gets fixed time quantum (10-100ms). Max wait time = (n-1) × q." },
      { term: "Priority Scheduling", definition: "CPU allocated to highest priority process. Problem: starvation. Solution: Aging." },
      { term: "Race Condition", definition: "Multiple processes access shared data concurrently; final value depends on which finishes last." },
      { term: "Critical Section", definition: "Code segment that cannot execute concurrently with itself. Requires Mutual Exclusion, Progress, Bounded Waiting." }
    ]
  }
];

export const quickReferenceItems = [
  { formula: "Physical Address (CMA)", description: "PA = Logical Address + Relocation Register", chapter: 6 },
  { formula: "Process count after n fork()", description: "Total processes = 2^n; Child processes = 2^n - 1", chapter: 3 },
  { formula: "Average Access Time", description: "= (hit_ratio × T_RAM) + ((1-hit_ratio) × (T_RAM + T_Disk))", chapter: 6 },
  { formula: "Banker's Algorithm - Need", description: "Need = Maximum Need - Allocation", chapter: 5 },
  { formula: "File Permission Value (*nix)", description: "Read = 4, Write = 2, Execute = 1; Full privilege = 7", chapter: 7 },
  { formula: "Context Switch Time", description: "~10 microseconds", chapter: 3 },
  { formula: "CPU Time Slice", description: "10 - 100 milliseconds per process", chapter: 9 },
  { formula: "Round Robin Max Wait", description: "(n - 1) × time_quantum", chapter: 9 },
  { formula: "Logical Address (Paging)", description: "Divided into: Page Number (P) + Offset (D)", chapter: 6 },
  { formula: "IaaS / PaaS / SaaS", description: "Host / Build / Consume", chapter: 8 },
  { formula: "Mode bit", description: "0 = Kernel/Monitor; 1 = User", chapter: 2 },
  { formula: "Deadlock requires", description: "All 4: Mutual Exclusion + Hold & Wait + Non-Preemption + Circular Wait", chapter: 5 },
];
