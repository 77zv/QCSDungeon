type StudentState = {
    health: number;
    inventory: Items[];
}

type Items = "Carabiner" | "Keys" | "Student Card" | "Chicken Tendies" | "Poutine" | "Snackers" | "Fries";

type Room = {
    text: string;
    studentState: StudentState;
    actions: Record<string, [Items | undefined, Room]>
}

type Room1<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "✨ Welcome CS student! You've just awoken from your gaming chair 💺";
    studentState: S
    actions: {
        "Grab toothbrush": [undefined, Room1_2<S>],
        "Grab toiletries": [undefined, Room1_3<S>],
        "Grab carabiner": [undefined, Room1_4<{ health: S["health"], inventory: [...S["inventory"], "Carabiner"] }>],
        "Grab student card": [undefined, Room1_5<{ health: S["health"], inventory: [...S["inventory"], "Student Card"] }>],
        "Grab keys": [undefined, Corridor<{health: S["health"], inventory: [...S['inventory'], "Keys"]}>]
    };
};

type Room1_2<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "It seems there is some force that doesn't let you pick up your toothbrush 🤔? Oh well, who brushes their teeth anyways... moving on";
    studentState: S
    actions: {
        "Grab toiletries": [undefined, Room1_3<S>],
        "Grab carabiner": [undefined, Room1_4<{ health: S["health"], inventory: [...S["inventory"], "Carabiner"] }>],
        "Grab student card": [undefined, Room1_5<{ health: S["health"], inventory: [...S["inventory"], "Student Card"] }>],
        "Grab keys": [undefined, Corridor<{health: S["health"], inventory: [...S['inventory'], "Keys"]}>]
    };
};

type Room1_3<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "It seems there is some force that doesn't let you pick up your toiletries 🤔? Oh well, I guess no shower... moving on";
    studentState: S;
    actions: {
        "Grab toothbrush": [undefined, Room1_2<S>],
        "Grab carabiner": [undefined, Room1_4<{ health: S["health"], inventory: [...S["inventory"], "Carabiner"] }>],
        "Grab student card": [undefined, Room1_5<{ health: S["health"], inventory: [...S["inventory"], "Student Card"] }>],
        "Grab keys": [undefined, Corridor<{health: S["health"], inventory: [...S['inventory'], "Keys"]}>]
    };
};

type Room1_4<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You picked up the Carabiner 🔒";
    studentState: S;
    actions: {
        "Grab toothbrush": [undefined, Room1_2<S>],
        "Grab toiletries": [undefined, Room1_3<S>],
        "Grab student card": [undefined, Room1_5<{ health: S["health"], inventory: [...S["inventory"], "Student Card"] }>],
        "Grab keys": [undefined, Corridor<{health: S["health"], inventory: [...S['inventory'], "Keys"]}>]
    };
};

type Room1_5<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You picked up your Student Card 💳";
    studentState: S;
    actions: {
        "Grab toothbrush": [undefined, Room1_2<S>],
        "Grab toiletries": [undefined, Room1_3<S>],
        "Grab carabiner": [undefined, Room1_4<{ health: S["health"], inventory: [...S["inventory"], "Carabiner"] }>],
        "Grab keys": [undefined, Corridor<{health: S["health"], inventory: [...S['inventory'], "Keys"]}>]
    };
};


type Corridor<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You got ur keys and now you're in the hallway. You better move quick before you're forced into social interaction 🧟👹👺!";
    studentState: S;
    actions: {
        "Go back inside": ["Keys", Room1<S>],
        "Get in elevator": [undefined, Elevator<S>]
    }
}

type Corridor_2<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You've left the elavator and now you're back on the fifth floor hallway. You better move quick before you're forced into social interaction 🧟👹👺!";
    studentState: S;
    actions: {
        "Go back inside": ["Keys", Room1<S>],
        "Get in elevator": [undefined, Elevator<S>],
    }
}


type Elevator<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You're in the elevator. You can go to the first or ground floor.";
    studentState: S;
    actions: {
        exit: [undefined, Corridor_2<S>],
        first: [undefined, Elevator_3<S>],
        ground: [undefined, Elevator_2<S>]
    };
};

type Elevator_2<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You're in the elevator. You can go to the first floor or fifth floor.";
    studentState: S;
    actions: {
        fifth: [undefined, Elevator<S>]
        first: [undefined, FirstFloorVic<S>]
    };
};
type Elevator_3<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You're in the elevator. You can go to the ground floor or fifth floor.";
    studentState: S;
    actions: {
        fifth: [undefined, Elevator<S>]
        ground: [undefined, LazyScholar<S>]
    }
}

type LazyScholar<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You're at the Lazy Scholar. You can get a snack or go back to the elevator.";
    studentState: S;
    actions: {
        "Get back in elevator": [undefined, Elevator_2<S>]
        "Order Chicken Tendies": [undefined, LazyScholar_2<{ health: S["health"], inventory: [...S["inventory"], "Chicken Tendies"] }>],
        "Order Snackers": [undefined, LazyScholar_3<{ health: S["health"], inventory: [...S["inventory"], "Snackers"] }>],
        "Order Poutine": [undefined, LazyScholar_4<{ health: S["health"], inventory: [...S["inventory"], "Poutine"] }>],
        "Order Salad": [undefined, LazyScholar_5<{ health: S["health"], inventory: [...S["inventory"], "Fries"] }>]
    }
}
type LazyScholar_2<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You ordered Chicken Tendies. You can get a snack or go back to the elevator.";
    studentState: S;
    actions: {
        "Get back in elevator": [undefined, Elevator_2<S>],
        "Order Snackers": [undefined, LazyScholar_3<{ health: S["health"], inventory: [...S["inventory"], "Snackers"] }>],
        "Order Poutine": [undefined, LazyScholar_4<{ health: S["health"], inventory: [...S["inventory"], "Poutine"] }>],
        "Order Salad": [undefined, LazyScholar_5<{ health: S["health"], inventory: [...S["inventory"], "Fries"] }>]
    }
}
type LazyScholar_3<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You ordered Snackers. You can get a snack or go back to the elevator.";
    studentState: S;
    actions: {
        "Get back in elevator": [undefined, Elevator_2<S>],
        "Order Chicken Tendies": [undefined, LazyScholar_2<{ health: S["health"], inventory: [...S["inventory"], "Chicken Tendies"] }>],
        "Order Poutine": [undefined, LazyScholar_4<{ health: S["health"], inventory: [...S["inventory"], "Poutine"] }>],
        "Order Salad": [undefined, LazyScholar_5<{ health: S["health"], inventory: [...S["inventory"], "Fries"] }>]
    }
}

type LazyScholar_4<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You ordered Poutine. You can get a snack or go back to the elevator.";
    studentState: S;
    actions: {
        "Get back in elevator": [undefined, Elevator_2<S>]
        "Order Chicken Tendies": [undefined, LazyScholar_2<{ health: S["health"], inventory: [...S["inventory"], "Chicken Tendies"] }>],
        "Order Snackers": [undefined, LazyScholar_3<{ health: S["health"], inventory: [...S["inventory"], "Snackers"] }>],
        "Order Salad": [undefined, LazyScholar_5<{ health: S["health"], inventory: [...S["inventory"], "Fries"] }>]
    }
}

type LazyScholar_5<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You tried to order a Salad, but some uncontrollable force made you say Fries instead.";
    studentState: S;
    actions: {
        "Get back in elevator": [undefined, Elevator_2<S>],
        "Order Chicken Tendies": [undefined, LazyScholar_2<{ health: S["health"], inventory: [...S["inventory"], "Chicken Tendies"] }>],
        "Order Snackers": [undefined, LazyScholar_3<{ health: S["health"], inventory: [...S["inventory"], "Snackers"] }>],
        "Order Poutine": [undefined, LazyScholar_4<{ health: S["health"], inventory: [...S["inventory"], "Poutine"] }>]
    }
}

type FirstFloorVic<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "You're on the first floor, you can change floors, or SPRINT 🏃‍♂️ to Lenny or the Gym.";
    studentState: S;
    actions: {
        "Get in elevator": [undefined, Elevator_3<S>],
        "Go to Lenny": ["Student Card", Dead_1<S>],
        "Go to the gym": [undefined, Dead_2<{ health: 0, inventory: [...S['inventory']] }>]
    }
}

type Dead_1<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "The thought of the risk of social interaction at Lenny has overwhelmed every single sense in your body, causing you to collapse.";
    studentState: S;
    actions: {}
}

type Dead_2<S extends StudentState = { health: 100, inventory: [] }> = {
    text: "The thought of going to the gym has overwhelmed every single sense in your body, causing you to collapse.";
    studentState: S;
    actions: {}
}

type Includes<List extends any[], Element extends any>
    = List extends [infer FirstElement, ...infer Rest]
        ? FirstElement extends Element ? true
        : Includes<Rest, Element>
        : false;

type CanAct<A extends Room["actions"][string], I extends StudentState["inventory"]> =
    A[0] extends undefined ? true : Includes<I, A[0]>;

type D = CanAct<["Fries", Elevator_2], ["Snackers"]>

type Act<R extends Room, Action extends keyof R["actions"]> =
    CanAct<R["actions"][Action], R["studentState"]['inventory']> extends true
    ? R["actions"][Action][1] : never;

type Step1 = Act<Room1, "Grab carabiner">
type Step2 = Act<Step1, "Grab toiletries">
type Step3 = Act<Step2, "Grab keys">
type Step4 = Act<Step3, "Get in elevator">['studentState']['inventory']
