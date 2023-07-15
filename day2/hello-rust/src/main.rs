fn main() {
    let mut nvowels = 0;
    let vowels = "aeiou";
    const TEXT: &str = "The quick brown fox jumps over the lazy dog";

    for c in TEXT.chars() {
        if vowels.contains(c) {
            nvowels += 1;
        }
    }

    println!("There are {nvowels} vowels in: {TEXT}");
}
