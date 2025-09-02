public class WhileLoopExample {
    public static void main(String[] args) {
        int i = 1, sum = 0;

        while (i <= 10) {
            sum += i;
            i++;
        }
        System.out.println("Sum of first 10 numbers = " + sum);
    }
}

