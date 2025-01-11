import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class SimpleLogin {

    private static final Map<String, String> users = new HashMap<>();
    private static final Map<String, String> emailDatabase = new HashMap<>();

    public static void main(String[] args) {

        users.put("ryan", "psswrd123");
        users.put("goataadi", "12345");
        users.put("barca", "sextuple");

        emailDatabase.put("ryan", "ryan@example.com");
        emailDatabase.put("goataadi", "goataadi@example.com");
        emailDatabase.put("barca", "barca@example.com");

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your username: ");
        String username = scanner.nextLine();

        System.out.print("Enter your password: ");
        String password = scanner.nextLine();

        if (isValidUser(username, password)) {
            System.out.println("Login successful! Welcome, " + username + "!");
            System.out.println("Go to Homepage: https://your-homepage-link.com");
        } else {
            System.out.println("Invalid username or password.");
            System.out.println("Forgot password? (yes/no): ");
            String reset = scanner.nextLine();
            if (reset.equalsIgnoreCase("yes")) {
                System.out.print("Enter your email to reset the password: ");
                String email = scanner.nextLine();
                resetPassword(email);
            }
        }

        System.out.println("Would you like to create a new account? (yes/no): ");
        String signUpResponse = scanner.nextLine();
        if (signUpResponse.equalsIgnoreCase("yes"))
