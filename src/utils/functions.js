import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier"

// `exercisesFlattener` function takes an object of exercises that may contain variants and returns a flattened version.
// We store the result in `exercises` to easily access all exercise variants in a flat structure.
const exercises = exercisesFlattener(EXERCISES)

/**
 * Generates a workout based on specified user preferences for muscle groups, workout type, and goal.
 * args object ontains the muscle groups, workout type, and goal.
 * returns array of workout exercises with details like name, tempo, reps, and rest.
 */
export function generateWorkout(args) {
    const { muscles, poison: workout, goal } = args // Destructuring for cleaner access to inputs.

    // List of available exercise keys from `exercises` object.
    // `filter` excludes exercises specific to home environments, refining for gym-based workouts.
    let exer = Object.keys(exercises);
    exer = exer.filter((key) => exercises[key].meta.environment !== "home");

    let includedTracker = [];   // Tracks selected exercises to prevent duplicates in the workout.
    let numSets = 5;    // Default number of sets for the workout.
    let listOfMuscles;  // Array of target muscle groups based on workout type.

    // Determine the muscle groups to include:
    // - For individual workouts, use specified muscles directly.
    // - For specific workout programs, use predefined groups in WORKOUTS.
    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = WORKOUTS[workout][muscles[0]];
    }

    // Convert `listOfMuscles` to a set to remove duplicates and shuffle order for variety in exercises.
    listOfMuscles = new Set(shuffleArray(listOfMuscles));
    let arrOfMuscles = Array.from(listOfMuscles);   // Convert back to an array to access each muscle by index.
    let scheme = goal   // Assign user’s training goal to `scheme` for simpler references.

    // Generate sets based on SCHEMES:
    // - `.reduce()` builds an array where each element represents either "compound" or "accessory".
    // - We do this based on the rep ratio defined by the `scheme` in SCHEMES.
    let sets = SCHEMES[scheme].ratio
        .reduce((acc, curr, index) => {
            // For each `curr` value in the `ratio` array, map it to "compound" or "accessory".
            return [
                ...acc,
                ...[...Array(parseInt(curr)).keys()].map((val) =>
                    index === 0 ? "compound" : "accessory"
                ),
            ];
        }, [])
        .reduce((acc, curr, index) => {
            // This second reduce function pairs each "compound"/"accessory" label with a muscle group.
            const muscleGroupToUse =
                index < arrOfMuscles.length
                    ? arrOfMuscles[index]
                    : arrOfMuscles[index % arrOfMuscles.length];
            return [
                ...acc,
                {
                    setType: curr,
                    muscleGroup: muscleGroupToUse,
                },
            ];
        }, []);

    // Categorize exercises into compound or accessory:
    const { compound: compoundExercises, accessory: accessoryExercises } =
        exer.reduce(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false;
                // Check if the exercise involves any of the target muscles.
                for (const musc of exercises[curr].muscles) {
                    if (listOfMuscles.has(musc)) {
                        exerciseHasRequiredMuscle = true;
                    }
                }
                // If it does, add it to the appropriate category (`compound` or `accessory`).
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [exercises[curr].type]: {
                            ...acc[exercises[curr].type],
                            [curr]: exercises[curr],
                        },
                    }
                    : acc;
            },
            { compound: {}, accessory: {} }
        );

    // Generate workout details (`genWOD`) for each set:
    const genWOD = sets.map(({ setType, muscleGroup }) => {
        // Determine data set (compound or accessory exercises) based on `setType`.
        const data =
            setType === "compound" ? compoundExercises : accessoryExercises;
            
        // Filter data to exclude previously used exercises and narrow down by `muscleGroup`.
        const filteredObj = Object.keys(data).reduce((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc;  // Skip exercises already used or not targeting `muscleGroup`.
            }
            return { ...acc, [curr]: exercises[curr] };
        }, {});

        // Randomly pick an exercise from the filtered list or fall back to the opposite type’s list.
        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val));

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ];

        // Return an empty object if no exercise is found (e.g., if all options were used).
        if (!randomExercise) {
            return {};
        }

        // Determine reps or duration based on exercise unit:
        // - `repsOrDuration` varies with `SCHEMES`'s rep ranges for "reps".
        // - Adds variance if accessory exercise by adding 4.
        let repsOrDuraction =
            exercises[randomExercise].unit === "reps"
                ? Math.min(...SCHEMES[scheme].repRanges) +
                Math.floor(
                    Math.random() *
                    (Math.max(...SCHEMES[scheme].repRanges) -
                        Math.min(...SCHEMES[scheme].repRanges))
                ) +
                (setType === "accessory" ? 4 : 0)
                : Math.floor(Math.random() * 40) + 20;

        // Randomly select a tempo and adjust `repsOrDuration` if needed to ensure each set remains under 85 seconds.
        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            if (tempoSum * parseInt(repsOrDuraction) > 85) {
                // Round `repsOrDuration` to nearest 5 seconds for uniformity.
                repsOrDuraction = Math.floor(85 / tempoSum);
            }
        } else {
            //set to nearest 5 seconds
            repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
        }
        includedTracker.push(randomExercise);   // Track the selected exercise to avoid repeats.

        // Return a structured object for each exercise in the workout.
        return {
            name: randomExercise,
            tempo,
            rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
            reps: repsOrDuraction,
            ...exercises[randomExercise],
        };
    });

    // Filter out any empty exercise objects to return a complete workout.
    return genWOD.filter(
        (element) => Object.keys(element).length > 0
    );
}

/**
 * Shuffle an array in place (for `listOfMuscles`) to ensure variety.
 * This uses the Fisher-Yates algorithm to produce a random ordering of items.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

/**
 * Flattens an object of exercises by converting any variants into unique exercises.
 * This creates a flat structure to make access easier for the `generateWorkout` function.
 */
function exercisesFlattener(exercisesObj) {
    const flattenedObj = {}

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replaceAll(' ', '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val,
                    description: val.description + '___' + val.variants[variant],
                    substitutes: [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}